import BlurText from "./react-bits/BlurText/BlurText";

const About = () => {
  return (
    <section className="py-16 md:py-24 text-white bg-black">
      <div className="container mx-auto px-5">
        <div className="flex flex-col items-center lg:items-start gap-8 mx-auto">
          <BlurText
            text="Tentang"
            delay={5000}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center lg:text-left"
          />

          <BlurText
            text="Batik Nusantara adalah wadah informasi yang didedikasikan untuk melestarikan dan memperkenalkan batik sebagai warisan budaya Indonesia. Lebih dari sekadar kain bercorak indah, batik mengandung makna filosofis yang lahir dari nilai, doa, dan harapan masyarakat. Setiap motif, seperti Parang yang melambangkan keteguhan, Kawung sebagai simbol keadilan, hingga Mega Mendung yang mencerminkan kesabaran, menyimpan cerita mendalam dari berbagai daerah di Nusantara. Melalui pemahaman akan sejarah, ragam motif, serta proses pembuatannya yang teliti dan penuh seni, Batik Nusantara hadir untuk menumbuhkan apresiasi generasi masa kini terhadap batik sebagai identitas bangsa sekaligus karya seni yang abadi."
            className="Font-Bodoni font-light leading-relaxed text-base md:text-lg lg:text-xl text-gray-300 text-center sm:flex sm:justify-center md:justify-center lg:justify-normal"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
