import { useEffect, useState } from "react";
import { Calendar, User } from "lucide-react";
import ArticleService from "../../../services/ArticleService";
import LoadingGrid from "../../../components/LoadingGrid";
import { truncateHTML } from "../../../utils/truncateHTML";
import { formatTanggal } from "../../../utils/formatTanggal";
import BlurText from "../../../components/react-bits/BlurText/BlurText";
import { getImage } from "../../../utils/imageHelper";

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await ArticleService.getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <LoadingGrid />;
  }

  return (
    <section className="min-h-screen bg-black text-white py-10 px-5">
      <div className="py-10">
        <BlurText delay={100} text="Artikel" className="text-5xl font-bold"/>
        <p className="mt-3 lg:text-xl md:text-md max-w-xl">
          Temukan kumpulan artikel terbaru seputar tips, inspirasi, dan berita
          menarik dari kami.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
          >
            {article.image_url && (
              <img
                src={getImage(article.image_url)}
                alt={article.title}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-xl font-semibold hover:text-amber-500 transition-colors">
                {article.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <User size={14} /> {article.author || "Unknown"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {formatTanggal(article.created_at)}
                </span>
              </div>
              <p
                className="text-gray-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: truncateHTML(article.description, 150),
                }}
              />
              <a
                href="#"
                className="mt-4 inline-block text-amber-500 hover:underline text-sm"
              >
                Baca Selengkapnya →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
