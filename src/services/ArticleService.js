import { supabase } from "../supabaseClient";

class ArticleService {
  /**
   * Fetch all articles ordered by latest
   * @returns {Promise<Array>} Array of article objects
   */
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

  /**
   * Upload image to Supabase storage
   * @param {File} file - Image file to upload
   * @returns {Promise<string>} Public URL of uploaded image
   */
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

  /**
   * Create new article
   * @param {Object} articleData - Article data object
   * @returns {Promise<Object>} Created article object
   */
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

  /**
   * Delete article by ID
   * @param {number} id - Article ID to delete
   * @returns {Promise<void>}
   */
  async deleteArticle(id) {
    try {
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

  /**
   * Update article by ID
   * @param {number} id - Article ID to update
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated article object
   */
  async updateArticle(id, updateData) {
    try {
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
