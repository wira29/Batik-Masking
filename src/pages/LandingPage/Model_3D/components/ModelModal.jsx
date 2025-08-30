import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ModelService from "../../../../services/ModelService";
import LoadingGrid from "../../../../components/LoadingGrid";

export default function ModelModal({ setOpenModel, selectModel }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const res = await ModelService.getModels();
        if (res) {
          setModels(res);
        }
      } catch (err) {
        console.error("Gagal mengambil model dari DB:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#242526] rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-500/[0.5]">
          <div className="space-y-2 text-white">
            <h1 className="text-3xl font-semibold">Pilih Model</h1>
            <p>Pilih Model untuk menerapkan batik yang anda pilih</p>
          </div>
          <button
            onClick={() => setOpenModel(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-8 h-8 text-gray-500 cursor-pointer" />
          </button>
        </div>

        {loading ? (
          <LoadingGrid />
        ) : (
          <div className="grid grid-cols-5 gap-5 p-5 overflow-hidden">
            {models.map((data, index) => (
              <div
                key={index + 1}
                onClick={() => selectModel(data.file_url, data.layout_url)}
                className="bg-black border border-slate-200/[0.5] hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out rounded-lg w-44 h-44 overflow-hidden"
              >
                <img
                  src={data.preview_url}
                  alt={`Model | ${data.file_url}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
