import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const LoadingScreen = ({duration = 3000}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white">
      <div className="flex items-center gap-3">
        <Sparkles size={40} className="text-amber-500" />
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-amber-500">
          Batik<span className="text-white">Nusantara</span>
        </h1>
      </div>

      <div className="w-48 h-1 bg-white/20 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-amber-500 animate-[progress_2.5s_ease-in-out]" />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
