import { useEffect, useState } from "react";
import LoadingGrid from "../../../components/LoadingGrid";
import GalleryService from "../../../services/GalleryService";

export const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
const spanOptions = [
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-2",
];

const getRandomSpan = () => spanOptions[Math.floor(Math.random() * spanOptions.length)];


  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await GalleryService.getGallery();
        setImages(
          data.map((item) => ({
            id: item.id,
            title: item.title,
            desc: item.description,
            src: item.image_url || "/assets/dummy-image.jpg",
            span: getRandomSpan(),
          }))
        );
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <LoadingGrid/>

  return (
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
                  <h3 className="text-lg md:text-xl font-semibold">{img.title}</h3>
                  <p className="text-sm md:text-base font-light">{img.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
