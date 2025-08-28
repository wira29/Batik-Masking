import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import DragDropUpload from './DragDropUpload';

const MotifForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: null
  });

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (file) => {
    setForm(prev => ({ ...prev, image: file }));
  };

  const handleRemoveFile = () => {
    setForm(prev => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({ title: '', description: '', image: null });
  };

  // const isFormValid = form.title.trim() && form.description.trim();

  return (
    <div className="bg-black rounded-xl border border-gray-500/[0.5] overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Tambah Motif Baru</span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Buat motif batik baru untuk koleksi Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Judul Motif <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nama motif (harus unik)"
            value={form.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"

          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Deskripsi <span className="text-red-400">*</span>
          </label>
          <textarea
            placeholder="Ceritakan tentang motif ini, sejarah, filosofi, atau makna khususnya..."
            value={form.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"

          />
        </div>

        <DragDropUpload
          onFileSelect={handleFileSelect}
          selectedFile={form.image}
          onRemove={handleRemoveFile}
          isRequired={true}
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
                <span>Tambah Motif</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MotifForm;