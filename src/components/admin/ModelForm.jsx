import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import DragDropUpload from "./DragDropUpload";

const ModelForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({ file: null, layout: null, preview: null });

  const handleFileSelect = (key, file) =>
    setForm((prev) => ({ ...prev, [key]: file }));
  const handleRemoveFile = (key) =>
    setForm((prev) => ({ ...prev, [key]: null }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file || !form.layout || !form.preview)
      return alert("Semua file wajib diupload!");
    try {
      await onSubmit({
        file: form.file,
        layout: form.layout,
        preview: form.preview,
      });
      setForm({ file: null, layout: null, preview: null });
    } catch {
      alert("Gagal menyimpan model. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-black rounded-xl border border-gray-500/[0.5] overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Tambah Model Baru</span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Upload file model <code>.obj</code>, layout, dan preview untuk koleksi
          Anda
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <p className="text-gray-300 mb-2 font-medium">File Model (.obj)</p>
          <DragDropUpload
            onFileSelect={(f) => handleFileSelect("file", f)}
            selectedFile={form.file}
            onRemove={() => handleRemoveFile("file")}
            isRequired
            maxFileSizeMB={5}
            accept=".obj,model/*"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2 font-medium">Layout (.png)</p>
          <DragDropUpload
            onFileSelect={(f) => handleFileSelect("layout", f)}
            selectedFile={form.layout}
            onRemove={() => handleRemoveFile("layout")}
            isRequired
            maxFileSizeMB={5}
            accept="image/png,image/*"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2 font-medium">Preview (.png)</p>
          <DragDropUpload
            onFileSelect={(f) => handleFileSelect("preview", f)}
            selectedFile={form.preview}
            onRemove={() => handleRemoveFile("preview")}
            isRequired
            maxFileSizeMB={5}
            accept="image/png,image/*"
          />
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-800">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-500 rounded-xl hover:bg-purple-400 disabled:hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Tambah Model</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModelForm;
