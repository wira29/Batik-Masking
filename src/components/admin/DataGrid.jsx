import { Trash2, Eye, Pencil, CuboidIcon } from "lucide-react";

const DataGrid = ({
  items = [],
  onEdit,
  onDelete,
  loading = false,
  deletingId,
  titleKey = "title",
  descriptionKey = "description",
  imageKey = "image_url",
  dateKey = "created_at",
  emptyMessage = "Belum ada data",
  emptySubMessage = "Tambahkan data pertama Anda",
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-black rounded-xl border border-gray-500/[0.5] overflow-hidden animate-pulse"
          >
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

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-32 h-32 mx-auto mb-6 bg-black border border-slate-200/[0.5] rounded-full flex items-center justify-center">
          <Eye className="w-16 h-16 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {emptyMessage}
        </h3>
        <p className="text-white">{emptySubMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => {
          const isObjFile = item["file_url"]?.endsWith(".obj");

          return (
            <div
              key={item.id}
              className="bg-black rounded-xl border border-gray-500/[0.5] overflow-hidden hover:border-600/[0.5] transition-all duration-200 group"
            >
              <div className="relative w-full h-48 bg-black overflow-hidden">
                {isObjFile ? (
                  <div className="w-full h-full flex items-center justify-center">
                    {!item.preview_url ? (
                      <CuboidIcon className="w-28 h-28 text-purple-800" />
                    ) : (
                      <img src={item.preview_url} alt="Model" loading="lazy" />
                    )}
                  </div>
                ) : item[imageKey] ? (
                  <img
                    src={item[imageKey]}
                    alt={item[titleKey]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Eye className="w-12 h-12 text-gray-600" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="flex items-center space-x-2 p-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors pointer-events-auto"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item.id, item[titleKey])}
                      disabled={deletingId === item.id}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        deletingId === item.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      {deletingId === item.id ? (
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white line-clamp-1">
                  {item[titleKey]}
                </h3>

                {!isObjFile && (
                  <p className="text-gray-400 text-sm line-clamp-2">
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          (item[descriptionKey]?.slice(0, 50) ||
                            "Tidak ada deskripsi") +
                          (item[descriptionKey]?.length > 50 ? "..." : ""),
                      }}
                    />
                  </p>
                )}

                {item[dateKey] && (
                  <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-gray-500 text-xs">
                    <span>{formatDate(item[dateKey])}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataGrid;
