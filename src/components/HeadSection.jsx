import { Cloud, TreePalmIcon, Waves } from "lucide-react";
import CardSwap, { Card } from "./react-bits/CardSwap/CardSwap";

const HeadSection = () => {
  return (
    <section className="py-12 text-white lg:pr-20">
      <div className="relative container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6">
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium tracking-wide">
            Selamat Datang
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight Font-Bodoni leading-tight">
            Keindahan <span className="text-amber-600">Batik</span> Indonesia
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed Font-Bodoni font-light">
            Warisan budaya Indonesia yang penuh makna dan filosofi. Melalui
            sentuhan motif dan warna, kami hadirkan keindahan batik dalam karya
            yang abadi, elegan, dan bernilai tinggi.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-yellow-600 text-white font-semibold shadow-lg transition-all duration-300">
              Jelajahi Batik
            </button>
            <button className="px-6 py-3 rounded-xl border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 font-medium transition-all duration-300">
              Tentang Kami
            </button>
          </div>
        </div>

        <div className="hidden lg:block md:hidden">
          <div className="w-full">
            <CardSwap
              width={500}
              height={300}
              cardDistance={60}
              verticalDistance={70}
              delay={2000}
              pauseOnHover={false}
            >
              <Card>
                <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2">
                  <Waves className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-sm font-semibold text-gray-200">
                    Batik Parang
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <img
                    src="/assets/parang.jpeg"
                    alt="Batik Parang"
                    className="rounded-lg w-full h-40 object-cover shadow-md"
                  />
                  <p className="text-white text-sm font-light">
                    Motif Batik Parang melambangkan kesinambungan dan tidak
                    pernah terputus, salah satu motif klasik dari Jawa.
                  </p>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2">
                  <TreePalmIcon className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-sm font-semibold text-gray-200">
                    Batik Kawung
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <img
                    src="/assets/kawung.jpeg"
                    alt="Batik Kawung"
                    className="rounded-lg w-full h-40 object-cover shadow-md"
                  />
                  <p className="text-white text-sm font-light">
                    Batik Kawung berbentuk bulatan mirip buah kolang-kaling,
                    melambangkan keadilan dan kebijaksanaan.
                  </p>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2">
                  <Cloud className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-sm font-semibold text-gray-200">
                    Batik Mega Mendung
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <img
                    src="/assets/mega-mendung.jpeg"
                    alt="Batik Mega Mendung"
                    className="rounded-lg w-full h-40 object-cover shadow-md"
                  />
                  <p className="text-white text-sm font-light">
                    Motif Mega Mendung berasal dari Cirebon, menggambarkan awan
                    dan bermakna kesabaran serta ketenangan.
                  </p>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadSection;
