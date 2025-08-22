import { Link } from "react-router";
import MenuHeader from "../../assets/data/MenuHeader.json";
import CardSwap, { Card } from "../../components/react-bits/CardSwap/CardSwap";
import { Cloud, TreePalmIcon, Waves } from "lucide-react";
import BlurText from "../../components/react-bits/BlurText/BlurText";
import BounceCards from "../../components/react-bits/BounceCards/BounceCards";
import HorizontalCardRunner from "../../components/HorizontalCardRunner";
import BlogSection from "../../components/BlogSection";

const LandingPageV2 = () => {
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
    <div className="w-full h-screen bg-black py-16 px-32">
      <header className="flex justify-between items-center">
        <div class="flex items-center gap-4 text-white">
          <div class="size-10">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_319)">
                <path
                  d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_6_319">
                  <rect width="48" height="48" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 class="text-amber-600 text-4xl font-medium Font-Bodoni leading-tight tracking-[-0.015em]">
            Batik <span className="text-white">Nusantara</span>
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            {MenuHeader.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-white text-xl font-light hover:scale-105 duration-200 ease-in-out transition-all Font-Bodoni leading-normal hover:text-gray-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <section className="py-24 text-white">
        <div className="relative container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium tracking-wide">
              Selamat Datang
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight Font-Bodoni leading-tight">
              Keindahan <span className="text-amber-600">Batik</span> Indonesia
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed Font-Bodoni font-light">
              Warisan budaya Indonesia yang penuh makna dan filosofi. Melalui
              sentuhan motif dan warna, kami hadirkan keindahan batik dalam
              karya yang abadi, elegan, dan bernilai tinggi.
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

          <div className="pr-16">
            <div style={{ height: "380px", position: "relative" }} className="">
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
                      src="/batik/batik-1.jpg"
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
                      src="/batik/batik-2.jpg"
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
                      src="/batik/batik-3.jpg"
                      alt="Batik Mega Mendung"
                      className="rounded-lg w-full h-40 object-cover shadow-md"
                    />
                    <p className="text-white text-sm font-light">
                      Motif Mega Mendung berasal dari Cirebon, menggambarkan
                      awan dan bermakna kesabaran serta ketenangan.
                    </p>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 text-white">
        <div className="flex justify-between items-center py-20">
          <div className="flex flex-col gap-8">
            <BlurText
              text="Tentang"
              delay={5000}
              animateBy="words"
              direction="top"
              className="text-7xl font-bold"
            />
            <BlurText
              text="Batik Nusantara adalah wadah informasi yang didedikasikan untuk melestarikan dan memperkenalkan batik sebagai warisan budaya Indonesia. Lebih dari sekadar kain bercorak indah, batik mengandung makna filosofis yang lahir dari nilai, doa, dan harapan masyarakat. Setiap motif, seperti Parang yang melambangkan keteguhan, Kawung sebagai simbol keadilan, hingga Mega Mendung yang mencerminkan kesabaran, menyimpan cerita mendalam dari berbagai daerah di Nusantara. Melalui pemahaman akan sejarah, ragam motif, serta proses pembuatannya yang teliti dan penuh seni, Batik Nusantara hadir untuk menumbuhkan apresiasi generasi masa kini terhadap batik sebagai identitas bangsa sekaligus karya seni yang abadi."
              className="Font-Bodoni font-light text-white leading-relaxed text-lg md:text-xl"
            />
          </div>
        </div>
      </section>
      <section className="pb-16 text-white">
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
          <div className="flex flex-col gap-6 max-w-xl">
            <BlurText
              text="Sejarah Batik"
              delay={2000}
              animateBy="words"
              direction="top"
              className="text-5xl md:text-7xl font-bold Font-Bodoni"
            />

            <p className="text-lg md:text-xl font-light text-white leading-relaxed Font-Bodoni">
              Batik telah menjadi bagian penting dari budaya Indonesia sejak
              berabad-abad lalu. Motif dan coraknya tidak hanya indah, tetapi
              juga sarat dengan filosofi serta nilai kehidupan. Pada masa
              kerajaan, batik digunakan sebagai simbol status sosial dan
              spiritual masyarakat.
            </p>

            <div>
              <a
                href="/sejarah-batik"
                className="inline-block px-6 py-2 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-500 transition-colors"
              >
                Selengkapnya →
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="text-white py-20">
        <div className="flex items-center gap-3">
          <TreePalmIcon size={50} />
          <BlurText
            text="Motif dan jenis-jenis batik"
            delay={1000}
            animateBy="words"
            direction="top"
            className="text-5xl font-bold py-16"
          />
        </div>
        <div className="mx-auto px-4">
          <HorizontalCardRunner items={items} autoPlay={true} interval={1000} />
        </div>
      </section>
      <BlogSection blogs={Blogs} />
      <section className="py-20">
        <div className="flex items-center w-full gap-5">
          <div className="w-full">
            <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Kontak Kami
            </h2>
            <div class="flex flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">
                  Nama
                </p>
                <input
                  placeholder="Masukkan nama Anda"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#393028] focus:border-none h-14 placeholder:text-[#baab9c] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div class="flex flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">
                  Email
                </p>
                <input
                  placeholder="Masukkan email Anda"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#393028] focus:border-none h-14 placeholder:text-[#baab9c] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div class="flex flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">
                  Pesan
                </p>
                <textarea
                  placeholder="Tulis pesan Anda"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#393028] focus:border-none min-h-36 placeholder:text-[#baab9c] p-4 text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>
          </div>
          <div className="rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.009843972945!2d112.60552317488349!3d-7.894037992128743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7881dad4337ebb%3A0xe39baa44cd10d225!2sBatik%20Tulis%20Lintang!5e0!3m2!1sid!2sid!4v1755851717260!5m2!1sid!2sid"
              width="600"
              height="450"
              style={{ borderRadius:"12px" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageV2;
