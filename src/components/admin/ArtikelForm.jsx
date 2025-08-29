import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import DragDropUpload from "./DragDropUpload";
import TextInput from "../TextInput";
import TextareaInput from "../TextareaInput";
import TextEditor from "../TextEditor";

const ArtikelForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "Unknown",
    image: null,
    slug: "",
  });

  const handleInputChange = (field, value) => {
    let newForm = { ...form, [field]: value };

    if (field === "title") {
      newForm.slug = value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    setForm(newForm);
  };

  const handleFileSelect = (file) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({ title: "", description: "", author: "", image: null, slug: "" });
  };

  return (
    <div className="bg-black rounded-xl border border-gray-500/[0.5] overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Tambah Artikel Baru</span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Tambah artikel baru untuk koleksi galeri Anda
        </p>
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
            placeholder="Slug artikel (otomatis dari judul)"
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
          label="description"
          value={form.description}
          onChange={(val) => handleInputChange("description", val)}
          placeholder="Masukkan deskripsi artikel"
          required
        />

        <DragDropUpload
          onFileSelect={handleFileSelect}
          selectedFile={form.image}
          onRemove={handleRemoveFile}
          isRequired={true}
          accept="image/jpeg,image/png,image/gif"
        />

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
                <span>Tambah Artikel</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtikelForm;
