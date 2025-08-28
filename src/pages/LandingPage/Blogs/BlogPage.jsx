import Blogs from "../../../assets/data/blogs.json";
import { Calendar, User } from "lucide-react";

const BlogPage = () => {
  return (
    <section className="min-h-screen bg-black text-white py-10">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {Blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-xl font-semibold hover:text-amber-500 transition-colors">
                {blog.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <User size={14} /> {blog.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {new Date(blog.date).toDateString()}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {blog.excerpt}
              </p>
              <a
                href={`/blogs/${blog.id}`}
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
