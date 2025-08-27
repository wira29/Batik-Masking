import { Trash2, Eye, Pencil } from 'lucide-react';

const MotifGrid = ({ motifs, onEdit, onDelete, loading }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-black rounded-xl border border-gray-500/[0.5] overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-black/50"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-white/50 rounded"></div>
              <div className="h-4 bg-white/50 rounded w-3/4"></div>
              <div className="h-4 bg-white/50 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (motifs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-32 h-32 mx-auto mb-6 bg-black border border-slate-200/[0.5] rounded-full flex items-center justify-center">
          <Eye className="w-16 h-16 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Belum ada motif</h3>
        <p className="text-white">Mulai dengan menambahkan motif batik pertama Anda</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {motifs.map((motif) => (
          <div 
            key={motif.id} 
            className="bg-black rounded-xl border border-gray-500/[0.5] overflow-hidden hover:border-600/[0.5] transition-all duration-200 group"
          >
            <div className="relative w-full h-48 bg-black overflow-hidden">
              {motif.image_url ? (
                <img
                  src={motif.image_url}
                  alt={motif.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Eye className="w-12 h-12 text-gray-600" />
                </div>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-2">
                <button
                  onClick={() => onEdit(motif)}
                  className="flex items-center space-x-2 p-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  <Pencil className="w-4 h-4"/>
                </button>

                <button
                  onClick={() => onDelete(motif.id, motif.title)}
                  className="flex items-center space-x-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold text-white line-clamp-1">
                {motif.title}
              </h3>
              
              <p className="text-gray-400 text-sm line-clamp-2">
                {motif.description || 'Tidak ada deskripsi'}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-gray-500 text-xs">
                <span>{formatDate(motif.created_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotifGrid;
