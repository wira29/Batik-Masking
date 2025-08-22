import Motif from "../../src/assets/data/motifs.json";
import Header from "../components/Header";

const MotifPage = () => {
  return (
    <section className="min-h-screen bg-black text-white py-16">
      <div className="mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Motif Batik Nusantara
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Motif.map((motif) => (
            <div
              key={motif.id}
              className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={motif.img}
                alt={motif.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-semibold">{motif.title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {motif.desc}
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
