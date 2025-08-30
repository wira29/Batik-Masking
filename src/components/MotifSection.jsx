import { useEffect, useState } from "react";
import { TreePalmIcon } from "lucide-react";
import BlurText from "./react-bits/BlurText/BlurText";
import HorizontalCardRunner from "./HorizontalCardRunner";
import MotifService from "../services/MotifService";
import LoadingGrid from "./LoadingGrid";

const MotifSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotifs = async () => {
      try {
        const data = await MotifService.getMotifs();
        setItems(data);
      } catch (error) {
        console.error("Gagal memuat data motif:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotifs();
  }, []);

  return (
    <section className="text-white py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-12 text-center md:text-left">
          <TreePalmIcon size={40} className="text-amber-500 flex-shrink-0" />
          <BlurText
            text="Motif dan Jenis-jenis Batik"
            delay={1000}
            animateBy="words"
            direction="top"
            className="text-3xl md:text-5xl font-bold"
          />
        </div>
        {loading ? (
          <LoadingGrid />
        ) : (
          <HorizontalCardRunner items={items} autoPlay={true} interval={2000} />
        )}
      </div>
    </section>
  );
};

export default MotifSection;
