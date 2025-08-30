import { Loader2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import DragDropUpload from "./DragDropUpload";
import TextInput from "../TextInput";
import TextEditor from "../TextEditor";

const EditArtikelModal = ({ isOpen, onClose, artikel, onSave, loading }) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    author: "",
    description: "",
    image: null,
    currentImageUrl: "",
  });

  useEffect(() => {
    if (artikel && isOpen) {
      setForm({
        title: artikel.title || "",
        slug: artikel.slug || "",
        author: artikel.author || "",
        description: artikel.description || "",
        image: null,
        currentImageUrl: artikel.image_url || "",
      });
    }
  }, [artikel, isOpen]);

  const handleInputChange = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "title") {
        updated.slug = value
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      }

      return updated;
    });
  };

  const handleFileSelect = (file) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      title: form.title,
      slug: form.slug,
      author: form.author,
      description: form.description,
      image_url: form.image,
    };
    await onSave(artikel.id, updateData);
  };

  if (!isOpen || !artikel) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-black rounded-xl border border-gray-500/[0.5] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-black border-b border-gray-500/[0.5] px-6 py-4 flex items-center justify-between z-50">
            <h2 className="text-xl font-bold text-white">
              Edit Artikel | {form.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Judul"
                value={form.title}
                onChange={(val) => handleInputChange("title", val)}
                placeholder="Masukkan judul artikel"
                required
              />

              <TextInput
                label="Slug"
                value={form.slug}
                onChange={(val) => handleInputChange("slug", val)}
                placeholder="Slug artikel"
                required
                readOnly
              />

              <TextInput
                label="Author"
                value={form.author}
                onChange={(val) => handleInputChange("author", val)}
                placeholder="Masukkan nama author"
                required
              />
            </div>

            <TextEditor
              label="Deskripsi Artikel"
              value={form.description}
              onChange={(val) => handleInputChange("description", val)}
              placeholder="Masukkan deskripsi artikel"
              required
            />

            {form.currentImageUrl && !form.image && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gambar Saat Ini
                </label>
                <div className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={form.currentImageUrl}
                    alt="Current motif"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-white text-sm bg-black bg-opacity-60 px-3 py-1 rounded">
                      Gambar saat ini
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {form.currentImageUrl
                  ? "Ganti Gambar (opsional)"
                  : "Upload Gambar"}
              </label>
              <DragDropUpload
                onFileSelect={handleFileSelect}
                selectedFile={form.image}
                onRemove={handleRemoveFile}
              />
              {form.currentImageUrl && (
                <p className="text-xs text-gray-500 mt-2">
                  * Biarkan kosong jika tidak ingin mengubah gambar
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 text-white bg-purple-500 rounded-xl hover:bg-purple-400 disabled:hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArtikelModal;
