import BlurText from "./react-bits/BlurText/BlurText";
import BounceCards from "./react-bits/BounceCards/BounceCards";

const History = () => {
  const images = [
    "/sejarah-batik/sejarah-batik-1.jpg",
    "/sejarah-batik/sejarah-batik-2.jpg",
    "/sejarah-batik/sejarah-batik-3.jpeg",
    "/sejarah-batik/sejarah-batik-4.jpeg",
    "/sejarah-batik/sejarah-batik-5.jpeg",
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)",
  ];
  return (
    <section className="pb-16 text-white px-5 lg:px-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <BounceCards
            className="custom-bounceCards"
            images={images}
            containerWidth={500}
            containerHeight={250}
            animationDelay={1}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            enableHover={true}
          />
        </div>
        <div className="flex flex-col gap-6 max-w-xl text-center lg:text-left">
          <BlurText
            text="Sejarah Batik"
            delay={2000}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-7xl font-bold Font-Bodoni text-center mx-auto lg:m-0 lg:text-left"
          />

          <p className="text-lg md:text-xl font-light text-white leading-relaxed Font-Bodoni">
            Batik telah menjadi bagian penting dari budaya Indonesia sejak
            berabad-abad lalu. Motif dan coraknya tidak hanya indah, tetapi juga
            sarat dengan filosofi serta nilai kehidupan. Pada masa kerajaan,
            batik digunakan sebagai simbol status sosial dan spiritual
            masyarakat.
          </p>

          {/* <div>
            <a
              href="/sejarah-batik"
              className="inline-block px-6 py-2 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-500 transition-colors"
            >
              Selengkapnya →
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default History;
