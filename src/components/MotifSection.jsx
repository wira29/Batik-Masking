import { TreePalmIcon } from "lucide-react";
import BlurText from "./react-bits/BlurText/BlurText";
import HorizontalCardRunner from "./HorizontalCardRunner";

const MotifSection = () => {
  const items = [
    {
      title: "Batik Parang",
      desc: "Motif klasik yang melambangkan kesinambungan, keteguhan, dan semangat tak terputus.",
      img: "/batik/batik-1.jpg",
    },
    {
      title: "Batik Kawung",
      desc: "Terinspirasi buah aren/kolang-kaling; bermakna kesucian, keadilan, dan kebijaksanaan.",
      img: "/batik/batik-2.jpg",
    },
    {
      title: "Mega Mendung",
      desc: "Awan berlapis khas Cirebon; melambangkan kesabaran dan ketenangan batin.",
      img: "/batik/batik-3.jpg",
    },
    {
      title: "Batik Tujuh Rupa",
      desc: "Pekalongan yang kaya warna dan ragam bentuk flora-fauna pesisiran.",
      img: "/sejarah-batik/sejarah-batik-1.jpg",
    },
    {
      title: "Batik Tujuh Rupa",
      desc: "Pekalongan yang kaya warna dan ragam bentuk flora-fauna pesisiran.",
      img: "/sejarah-batik/sejarah-batik-2.jpg",
    },
  ];

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

        <HorizontalCardRunner 
          items={items} 
          autoPlay={true} 
          interval={2000} 
        />
      </div>
    </section>
  );
};

export default MotifSection;
