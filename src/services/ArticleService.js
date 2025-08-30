import { supabase } from "../supabaseClient";

class ArticleService {
  async getArticles() {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw new Error(`Failed to fetch articles: ${error.message}`);
    }
  }

  async uploadImage(file) {
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      const { data, error } = await supabase.storage
        .from("article-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("article-images")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async createArticle(articleData) {
    try {
      const { data, error } = await supabase
        .from("articles")
        .insert(articleData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating article:", error);
      throw new Error(`Failed to create article: ${error.message}`);
    }
  }

  async deleteFileFromUrl(fileUrl) {
    if (!fileUrl) return;
    try {
      const path = fileUrl.split(`/storage/v1/object/public/article-images/`)[1];
      if (!path) return;
      await supabase.storage.from("article-images").remove([path]);
    } catch (err) {
      console.warn("Error deleting old file:", err.message);
    }
  }

  async deleteArticle(id) {
    try {
      const { data: article, error: fetchErr } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      if (fetchErr) throw fetchErr;

      await this.deleteFileFromUrl(article?.image_url);

      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.error("Error deleting article:", error);
      throw new Error(`Failed to delete article: ${error.message}`);
    }
  }

  async updateArticle(id, updateData) {
    try {
      const { data: oldArticle, error: fetchErr } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      if (fetchErr) throw fetchErr;

      if (updateData.image instanceof File) {
        updateData.image_url = await this.uploadImage(updateData.image);
        await this.deleteFileFromUrl(oldArticle.image_url);
      }

      const { data, error } = await supabase
        .from("articles")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating article:", error);
      throw new Error(`Failed to update article: ${error.message}`);
    }
  }
}

export default new ArticleService();
