import { X } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingGrid from "../../../../components/LoadingGrid";
import MotifService from "../../../../services/MotifService";
import { getImage } from "../../../../utils/imageHelper";

export default function MotifModal({
  setOpenMotif,
  setImages,
  createImageObject,
  imagesUrl,
}) {
  const [motifs, setMotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotifs = async () => {
      try {
        setLoading(true);
        const data = await MotifService.getMotifs();
        const combined = [
          ...data,
          // ...imagesUrl.map((url, index) => ({
          //   id: `local-${index}`,
          //   image_url: url,
          //   title: `Batik Lokal ${index + 1}`,
          // })),
        ];

        setMotifs(combined);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMotifs();
  }, []);

  const handleImageClick = (motif) => {
    setOpenMotif(false);
    const newImage = createImageObject(motif.image_url);
    setImages((prev) => [...prev, newImage]);
  };

  if (error)
    return <p className="text-red-500 text-center mt-16">Error: {error}</p>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#242526] rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-500/[0.5]">
          <div className="space-y-2 text-white">
            <h1 className="text-3xl font-semibold">Pilih Motif</h1>
            <p>Pilih Motif untuk diterapkan ke dalam model</p>
          </div>
          <button
            onClick={() => setOpenMotif(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-8 h-8 text-gray-500 cursor-pointer" />
          </button>
        </div>

        {loading ? (
          <LoadingGrid />
        ) : (
          <div className="grid grid-cols-5 gap-5 p-5 overflow-hidden">
            {motifs.map((motif) => (
              <div
                key={motif.id}
                className="bg-black border border-slate-200/[0.5] hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out rounded-lg w-44 h-44 overflow-hidden"
                onClick={() => handleImageClick(motif)}
              >
                <img
                  src={getImage(motif.image_url)}
                  alt={motif.title || "Motif"}
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
