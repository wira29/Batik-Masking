import { supabase } from "../supabaseClient";

class GalleryService {
  async getGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async uploadImage(file, bucket = "gallery") {
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

  async deleteFileFromUrl(fileUrl, bucket = "gallery") {
    if (!fileUrl) return;

    const path = fileUrl.split(`/storage/v1/object/public/${bucket}/`)[1];
    if (!path) return;

    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) console.error("❌ Error hapus file:", error.message);
    else console.info("File berhasil dihapus:", path);
  }

  async createGalleryItem({ title, description, image_url }) {
    const { data: created, error } = await supabase
      .from("gallery")
      .insert({ title, description, image_url })
      .select()
      .single();
    if (error) throw error;
    return created;
  }

  async updateGalleryItem(id, payload) {
    const { data: oldItem, error: fetchErr } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchErr) throw fetchErr;

    const newPayload = {};

    if (payload.image instanceof File) {
      newPayload.image_url = await this.uploadImage(payload.image);
      await this.deleteFileFromUrl(oldItem.image_url);
    } else if (payload.image_url) {
      newPayload.image_url = payload.image_url;
      await this.deleteFileFromUrl(oldItem.image_url);
    }

    Object.keys(payload)
      .filter((key) => key !== "image" && key !== "image_url")
      .forEach((key) => (newPayload[key] = payload[key]));

    if (Object.keys(newPayload).length === 0) return oldItem;

    const { data, error } = await supabase
      .from("gallery")
      .update(newPayload)
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async deleteGalleryItem(id) {
    const { data: item, error: fetchErr } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchErr) throw fetchErr;

    await this.deleteFileFromUrl(item?.image_url);

    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) throw error;
  }
}

export default new GalleryService();
