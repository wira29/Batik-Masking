import { supabase } from "../supabaseClient";

class ModelService {
  async getModels() {
    const { data, error } = await supabase
      .from("models")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async uploadFile(file, bucket = "model-files") {
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return urlData.publicUrl;
  }

  async createModel({ file, layout, preview }) {
    const fileUrl = await this.uploadFile(file, "model-files");
    const layoutUrl = await this.uploadFile(layout, "model-files");
    const previewUrl = await this.uploadFile(preview, "model-files");

    const { data, error } = await supabase
      .from("models")
      .insert({
        file_url: fileUrl,
        layout_url: layoutUrl,
        preview_url: previewUrl,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteFileFromUrl(fileUrl, bucket = "model-files") {
    if (!fileUrl) {
      console.warn("deleteFileFromUrl dipanggil tanpa fileUrl");
      return;
    }
    try {
      const path = fileUrl.split(`/storage/v1/object/public/${bucket}/`)[1];
      if (!path) {
        console.warn("Gagal parsing path dari URL:", fileUrl);
        return;
      }

      const { error } = await supabase.storage.from(bucket).remove([path]);
      if (error) {
        console.error("❌ Error hapus file:", error.message);
      } else {
        console.info("file berhasil dihapus:", path);
      }
    } catch (err) {
      console.warn("❌ Exception saat hapus file:", err.message);
    }
  }

  async updateModel(id, payload) {
    const { data: oldModel, error: fetchErr } = await supabase
      .from("models")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr) throw fetchErr;

    const newPayload = {};

    if (payload.file instanceof File) {
      newPayload.file_url = await this.uploadFile(payload.file);
      await this.deleteFileFromUrl(oldModel.file_url);
    } else if (payload.file_url) {
      newPayload.file_url = payload.file_url;
      await this.deleteFileFromUrl(oldModel.file_url);
    }

    if (payload.layout instanceof File) {
      newPayload.layout_url = await this.uploadFile(payload.layout);
      await this.deleteFileFromUrl(oldModel.layout_url);
    } else if (payload.layout_url) {
      newPayload.layout_url = payload.layout_url;
      await this.deleteFileFromUrl(oldModel.layout_url);
    }

    if (payload.preview instanceof File) {
      newPayload.preview_url = await this.uploadFile(payload.preview);
      await this.deleteFileFromUrl(oldModel.preview_url);
    } else if (payload.preview_url) {
      newPayload.preview_url = payload.preview_url;
      await this.deleteFileFromUrl(oldModel.preview_url);
    }

    if (Object.keys(newPayload).length === 0) {
      return oldModel;
    }

    const { data, error } = await supabase
      .from("models")
      .update(newPayload)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async deleteModel(id) {
    const { data: model, error: fetchErr } = await supabase
      .from("models")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr) throw fetchErr;


    await this.deleteFileFromUrl(model?.file_url);
    await this.deleteFileFromUrl(model?.layout_url);
    await this.deleteFileFromUrl(model?.preview_url);

    const { error } = await supabase.from("models").delete().eq("id", id);
    if (error) throw error;
  }
}

export default new ModelService();
