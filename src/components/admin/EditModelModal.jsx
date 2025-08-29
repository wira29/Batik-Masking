import { CuboidIcon, ImageIcon, Loader2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import DragDropUpload from "./DragDropUpload";

const EditModelModal = ({ isOpen, onClose, model, onSave, loading }) => {
  const [form, setForm] = useState({
    file: null,
    layout: null,
    preview: null,
    currentFileUrl: "",
    currentLayoutUrl: "",
    currentPreviewUrl: "",
  });

  useEffect(() => {
    if (model) {
      setForm({
        file: null,
        layout: null,
        preview: null,
        currentFileUrl: model.file_url || "",
        currentLayoutUrl: model.layout_url || "",
        currentPreviewUrl: model.preview_url || "",
      });
    }
  }, [model]);

  const handleFileSelect = (key, file) => {
    setForm((prev) => ({ ...prev, [key]: file }));
  };

  const handleRemoveFile = (key) => {
    setForm((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // hanya kirim yang ada file baru
    const updateData = {};
    if (form.file) updateData.file_url = form.file;
    if (form.layout) updateData.layout_url = form.layout;
    if (form.preview) updateData.preview_url = form.preview;

    await onSave(model.id, updateData);
  };

  if (!isOpen || !model) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-black rounded-xl border border-gray-500/[0.5] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-black border-b border-gray-500/[0.5] px-6 py-4 flex items-center justify-between z-50">
            <h2 className="text-xl font-bold text-white">Edit Model</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {form.currentFileUrl ? "Ganti File Model (.obj)" : "Upload File Model"}
              </label>
              <DragDropUpload
                onFileSelect={(f) => handleFileSelect("file", f)}
                selectedFile={form.file}
                onRemove={() => handleRemoveFile("file")}
                accept=".obj,model/*"
                maxFileSizeMB={5}
              />
              {form.currentFileUrl && (
                <p className="text-xs text-gray-500 mt-2">
                  * File saat ini: <code>.obj</code>. Biarkan kosong jika tidak ingin mengubah.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {form.currentLayoutUrl ? "Ganti Layout (.png)" : "Upload Layout"}
              </label>
              <DragDropUpload
                onFileSelect={(f) => handleFileSelect("layout", f)}
                selectedFile={form.layout}
                onRemove={() => handleRemoveFile("layout")}
                accept="image/png,image/*"
                maxFileSizeMB={5}
              />
              {form.currentLayoutUrl && (
                <p className="text-xs text-gray-500 mt-2">
                  * Ada file layout. Kosongkan jika tidak ingin mengubah.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {form.currentPreviewUrl ? "Ganti Preview (.png)" : "Upload Preview"}
              </label>
              <DragDropUpload
                onFileSelect={(f) => handleFileSelect("preview", f)}
                selectedFile={form.preview}
                onRemove={() => handleRemoveFile("preview")}
                accept="image/png,image/*"
                maxFileSizeMB={5}
              />
              {form.currentPreviewUrl && (
                <p className="text-xs text-gray-500 mt-2">
                  * Ada file preview. Kosongkan jika tidak ingin mengubah.
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

export default EditModelModal;
