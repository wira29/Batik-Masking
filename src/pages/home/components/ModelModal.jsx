import React from "react";
import { X } from "lucide-react";

export default function ModelModal({ dataModel, setOpenModel, selectModel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#242526] rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-500/[0.5]">
          <div className="space-y-2 text-white">
            <h1 className="text-3xl font-semibold">Pilih Model</h1>
            <p>Pilih Model untuk menerapkan batik yang anda pilih</p>
          </div>
          <button onClick={() => setOpenModel(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-8 h-8 text-gray-500 cursor-pointer" />
          </button>
        </div>
        <div className="grid grid-cols-5 gap-5 p-5 overflow-hidden">
          {dataModel.map((data, index) => (
            <div
              key={index + 1}
              onClick={() => selectModel(data.model, data.layout)}
              className="bg-black border border-slate-200/[0.5] hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out rounded-lg w-44 h-44 overflow-hidden"
            >
              <img src={data.img} alt={`Model | ${data.layout}`} className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
