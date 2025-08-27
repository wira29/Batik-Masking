import { useEffect, useState } from "react";
import MotifService from "../../../services/MotifService";
import LoadingGrid from "../../../components/LoadingGrid";
import Motifs from "../../../assets/data/motifs.json";

const MotifPage = () => {
  const [motifs, setMotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotifs = async () => {
      try {
        setLoading(true);
        const dataFromDB = await MotifService.getMotifs();

        // gabungkan DB + JSON
        const combinedData = [
          ...dataFromDB,
          ...Motifs.map((item, index) => ({
            ...item,
            id: `json-${index}`, // key unik untuk JSON
          })),
        ];

        setMotifs(combinedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMotifs();
  }, []);

  if (loading) return <LoadingGrid />;
  if (error)
    return <p className="text-center text-red-500 mt-16">Error: {error}</p>;

  return (
    <section className="min-h-screen bg-black text-white py-16">
      <div className="mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Motif Batik Nusantara
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {motifs.map((motif) => (
            <div
              key={motif.id}
              className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={motif.image_url}
                alt={motif.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-semibold">{motif.title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {motif.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MotifPage;
