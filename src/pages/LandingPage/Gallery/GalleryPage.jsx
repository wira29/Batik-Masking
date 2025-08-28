const images = [
  {
    id: 1,
    src: "/sejarah-batik/sejarah-batik-2.jpg",
    span: "col-span-2 row-span-2",
    title: "Batik Parang",
    desc: "Motif klasik melambangkan kekuatan & keberanian.",
  },
  {
    id: 2,
    src: "/batik/batik-1.jpg",
    span: "col-span-1 row-span-1",
    title: "Batik Kawung",
    desc: "Terinspirasi dari buah aren, simbol keseimbangan.",
  },
  {
    id: 3,
    src: "/batik/batik-3.jpg",
    span: "col-span-1 row-span-2",
    title: "Batik Mega Mendung",
    desc: "Motif awan biru, melambangkan keteduhan hati.",
  },
  {
    id: 4,
    src: "/sejarah-batik/sejarah-batik-1.jpg",
    span: "col-span-2 row-span-1",
    title: "Batik Lereng",
    desc: "Garis diagonal tegas, simbol kegigihan.",
  },
  {
    id: 5,
    src: "/sejarah-batik/sejarah-batik-2.jpg",
    span: "col-span-1 row-span-1",
    title: "Batik Sekar Jagad",
    desc: "Motif peta dunia, melambangkan keragaman.",
  },
  {
    id: 6,
    src: "/sejarah-batik/sejarah-batik-3.jpeg",
    span: "col-span-1 row-span-2",
    title: "Batik Sido Mukti",
    desc: "Dipakai saat pernikahan, simbol kebahagiaan.",
  },
  {
    id: 7,
    src: "/sejarah-batik/sejarah-batik-4.jpeg",
    span: "col-span-2 row-span-2",
    title: "Batik Truntum",
    desc: "Melambangkan cinta yang tumbuh kembali.",
  },
  {
    id: 8,
    src: "/batik/batik-1.jpg",
    span: "col-span-1 row-span-1",
    title: "Batik Ceplok",
    desc: "Pola geometris berulang, tanda keteraturan.",
  },
  {
    id: 9,
    src: "/sejarah-batik/sejarah-batik-3.jpeg",
    span: "col-span-1 row-span-1",
    title: "Batik Lasem",
    desc: "Perpaduan budaya Jawa & Tionghoa.",
  },
  {
    id: 10,
    src: "/sejarah-batik/sejarah-batik-4.jpeg",
    span: "col-span-2 row-span-1",
    title: "Batik Priangan",
    desc: "Asal Sunda, penuh warna cerah dan harmoni.",
  },
];

export const GalleryPage = () => {
  return (
    <>
      <section className="min-h-screen bg-black py-16 px-6 md:px-12">
        <div className="mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[250px] gap-4 grid-flow-dense">
            {images.map((img) => (
              <div
                key={img.id}
                className={`relative overflow-hidden rounded-2xl shadow-lg ${img.span} group`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-4 text-white translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <h3 className="text-lg md:text-xl font-semibold">
                      {img.title}
                    </h3>
                    <p className="text-sm md:text-base font-light">
                      {img.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
