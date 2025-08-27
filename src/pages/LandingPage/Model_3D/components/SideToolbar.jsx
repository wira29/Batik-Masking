import { ArrowLeft, Check, Palette, Shirt } from "lucide-react";

export default function SideToolbar({ applyTexture, setOpenModel, setOpenMotif }) {
  return (
    <div className="absolute top-70 -translate-y-1/2 left-5 flex flex-col gap-5 z-50">
      <button
        onClick={() => window.history.back()}
        title="Kembali"
        className="btn-back p-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg"
      >
        <ArrowLeft />
      </button>

      <button
        onClick={() => setOpenModel(true)}
        title="Pilih Model 3D"
        className="btn-model p-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg"
      >
        <Shirt />
      </button>

      <button
        onClick={() => setOpenMotif(true)}
        title="Pilih Motif Batik"
        className="btn-motif p-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg"
      >
        <Palette />
      </button>
      <button
        onClick={applyTexture}
        title="Terapkan Motif"
        className="btn-checklist p-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg"
      >
        <Check />
      </button>
    </div>
  );
}
