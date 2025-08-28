import { supabase } from "../supabaseClient";

class MotifService {
  /**
   * Fetch all motifs ordered by latest
   * @returns {Promise<Array>} Array of motif objects
   */
  async getMotifs() {
    try {
      const { data, error } = await supabase
        .from("motifs")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching motifs:", error);
      throw new Error(`Failed to fetch motifs: ${error.message}`);
    }
  }

  /**
   * Upload image to Supabase storage
   * @param {File} file - Image file to upload
   * @returns {Promise<string>} Public URL of uploaded image
   */
  async uploadImage(file) {
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const { data, error } = await supabase.storage
        .from("motifs")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("motifs")
        .getPublicUrl(fileName);
        
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  /**
   * Create new motif
   * @param {Object} motifData - Motif data object
   * @returns {Promise<Object>} Created motif object
   */
  async createMotif(motifData) {
    try {
      const { data, error } = await supabase
        .from("motifs")
        .insert(motifData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating motif:", error);
      throw new Error(`Failed to create motif: ${error.message}`);
    }
  }

  /**
   * Delete motif by ID
   * @param {number} id - Motif ID to delete
   * @returns {Promise<void>}
   */
  async deleteMotif(id) {
    try {
      const { error } = await supabase
        .from("motifs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting motif:", error);
      throw new Error(`Failed to delete motif: ${error.message}`);
    }
  }

  /**
   * Update motif by ID
   * @param {number} id - Motif ID to update
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated motif object
   */
  async updateMotif(id, updateData) {
    try {
      const { data, error } = await supabase
        .from("motifs")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating motif:", error);
      throw new Error(`Failed to update motif: ${error.message}`);
    }
  }
}

export default new MotifService();