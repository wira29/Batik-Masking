import BlogSection from "../../components/BlogSection";
import HeadSection from "../../components/HeadSection";
import About from "../../components/About";
import History from "../../components/History";
import MotifSection from "../../components/MotifSection";
import Contact from "../../components/Contact";

const LandingPageV2 = () => {
  const Blogs = [
    {
      id: 1,
      title: "Sejarah Batik Parang",
      desc: "Batik Parang adalah salah satu motif tertua di Indonesia, melambangkan keberanian, kekuatan, dan kesinambungan hidup.",
      img: "/batik/batik-1.jpg",
    },
    {
      id: 2,
      title: "Batik Mega Mendung",
      desc: "Motif khas Cirebon yang menggambarkan awan mendung, melambangkan kesabaran, keteduhan, serta keteguhan hati.",
      img: "/batik/batik-2.jpg",
    },
    {
      id: 3,
      title: "Batik Kawung",
      desc: "Motif berbentuk irisan buah kawung yang melambangkan kesucian, keseimbangan, dan keadilan dalam kehidupan.",
      img: "/batik/batik-3.jpg",
    },
    {
      id: 4,
      title: "Batik Tujuh Rupa",
      desc: "Motif khas Pekalongan dengan warna cerah dan penuh detail flora serta fauna yang menggambarkan kehidupan sehari-hari.",
      img: "/sejarah-batik/sejarah-batik-1.jpg",
    },
    {
      id: 5,
      title: "Batik Sogan",
      desc: "Batik tradisional keraton dengan warna cokelat sogan khas, melambangkan kewibawaan, kesopanan, dan kebijaksanaan.",
      img: "/sejarah-batik/sejarah-batik-2.jpg",
    },
    {
      id: 6,
      title: "Batik Sidomukti",
      desc: "Batik yang biasanya dipakai dalam upacara pernikahan Jawa, melambangkan harapan akan kebahagiaan dan kemakmuran.",
      img: "/sejarah-batik/sejarah-batik-3.jpeg",
    },
    {
      id: 7,
      title: "Batik Lasem",
      desc: "Motif batik pesisir dengan warna merah mencolok, melambangkan keberanian dan akulturasi budaya Tiongkok–Jawa.",
      img: "/sejarah-batik/sejarah-batik-4.jpeg",
    },
    {
      id: 8,
      title: "Batik Priangan",
      desc: "Motif khas Jawa Barat dengan warna lembut dan corak sederhana, melambangkan kesederhanaan dan ketenangan.",
      img: "/sejarah-batik/sejarah-batik-5.jpeg",
    },
    {
      id: 9,
      title: "Batik Bali",
      desc: "Motif batik khas Bali dengan ornamen flora, fauna, dan simbol religi Hindu, mencerminkan kekayaan budaya Bali.",
      img: "/sejarah-batik/sejarah-batik-1.jpg",
    },
    {
      id: 10,
      title: "Batik Bali",
      desc: "Motif batik khas Bali dengan ornamen flora, fauna, dan simbol religi Hindu, mencerminkan kekayaan budaya Bali.",
      img: "/sejarah-batik/sejarah-batik-1.jpg",
    },
  ];

  return (
    <>
      <HeadSection />
      <About />
      <History />
      <MotifSection />
      <BlogSection blogs={Blogs} />
      <Contact />
    </>
  );
};

export default LandingPageV2;
