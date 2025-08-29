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
    const fileName = `${Date.now()}_${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
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

  async updateModel(id, payload) {
    const { data, error } = await supabase
      .from("models")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteModel(id) {
    const { error } = await supabase.from("models").delete().eq("id", id);
    if (error) throw error;
  }
}

export default new ModelService();
