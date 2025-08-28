import { Loader2, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import DragDropUpload from './DragDropUpload';

const EditGalleryModal = ({ isOpen, onClose, motif, onSave, loading }) => {
    const [form, setForm] = useState({
        image: null,
        currentImageUrl: ''
    });

    useEffect(() => {
        if (motif) {
            setForm({
                image: null,
                currentImageUrl: motif.image_url || ''
            });
        }
    }, [motif]);

    const handleFileSelect = (file) => {
        setForm(prev => ({ ...prev, image: file }));
    };

    const handleRemoveFile = () => {
        setForm(prev => ({ ...prev, image: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateData = {
            title: form.title,
            description: form.description,
            newImage: form.image
        };

        await onSave(motif.id, updateData);
    };

    // const isFormValid = form.title.trim() && form.description.trim();

    if (!isOpen || !motif) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose}></div>
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-black rounded-xl border border-gray-500/[0.5] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-black border-b border-gray-500/[0.5] px-6 py-4 flex items-center justify-between z-50">
                        <h2 className="text-xl font-bold text-white">Edit Motif</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

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
                                {form.currentImageUrl ? 'Ganti Gambar (opsional)' : 'Upload Gambar'}
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

export default EditGalleryModal;