import { supabase } from "../supabaseClient";

class GalleryService {
  /**
   * Fetch all gallery items ordered by latest
   * @returns {Promise<Array>} Array of gallery objects
   */
  async getGallery() {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching gallery:", error);
      throw new Error(`Failed to fetch gallery: ${error.message}`);
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
        .from("gallery")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  /**
   * Create new gallery item
   * @param {Object} galleryData - Gallery data object
   * @returns {Promise<Object>} Created gallery object
   */
  async createGalleryItem(galleryData) {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .insert(galleryData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating gallery item:", error);
      throw new Error(`Failed to create gallery item: ${error.message}`);
    }
  }

  /**
   * Delete gallery item by ID
   * @param {number} id - Gallery ID to delete
   * @returns {Promise<void>}
   */
  async deleteGalleryItem(id) {
    try {
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      throw new Error(`Failed to delete gallery item: ${error.message}`);
    }
  }

  /**
   * Update gallery item by ID
   * @param {number} id - Gallery ID to update
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated gallery object
   */
  async updateGalleryItem(id, updateData) {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating gallery item:", error);
      throw new Error(`Failed to update gallery item: ${error.message}`);
    }
  }
}

export default new GalleryService();
