import { supabase } from "../supabaseClient";

class MotifService {
  async getMotifs() {
    const { data, error } = await supabase
      .from("motifs")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async uploadImage(file, bucket = "motifs") {
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return urlData.publicUrl;
  }

  async deleteFileFromUrl(fileUrl, bucket = "motifs") {
    if (!fileUrl) return;

    const path = fileUrl.split(`/storage/v1/object/public/${bucket}/`)[1];
    if (!path) return;

    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) console.error("❌ Error hapus file:", error.message);
    else console.info("File berhasil dihapus:", path);
  }

  async createMotif({ image, ...data }) {
    const imageUrl = await this.uploadImage(image);
    const { data: created, error } = await supabase
      .from("motifs")
      .insert({ ...data, image_url: imageUrl })
      .select()
      .single();
    if (error) throw error;
    return created;
  }

  async updateMotif(id, payload) {
    const { data: oldMotif, error: fetchErr } = await supabase
      .from("motifs")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchErr) throw fetchErr;

    const newPayload = {};

    if (payload.image instanceof File) {
      newPayload.image_url = await this.uploadImage(payload.image);
      await this.deleteFileFromUrl(oldMotif.image_url);
    } else if (payload.image_url) {
      newPayload.image_url = payload.image_url;
      await this.deleteFileFromUrl(oldMotif.image_url);
    }

    const keysToUpdate = Object.keys(payload).filter(k => k !== "image" && k !== "image_url");
    keysToUpdate.forEach(key => newPayload[key] = payload[key]);

    if (Object.keys(newPayload).length === 0) return oldMotif;

    const { data, error } = await supabase
      .from("motifs")
      .update(newPayload)
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async deleteMotif(id) {
    const { data: motif, error: fetchErr } = await supabase
      .from("motifs")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchErr) throw fetchErr;

    await this.deleteFileFromUrl(motif?.image_url);

    const { error } = await supabase.from("motifs").delete().eq("id", id);
    if (error) throw error;
  }
}

export default new MotifService();
