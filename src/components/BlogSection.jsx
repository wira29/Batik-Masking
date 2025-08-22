import React, { useState } from "react";
import { motion } from "framer-motion";

export default function BlogSection({ blogs }) {
  const [visibleCount, setVisibleCount] = useState(6);

  const showMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <section className="relative w-full py-16 bg-black text-white">
      <div className="mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10">Berita & Artikel</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {blogs.slice(0, visibleCount).map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-[#141414] shadow-lg border border-white/10"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {blog.desc.length > 100
                    ? blog.desc.slice(0, 100) + "..."
                    : blog.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < blogs.length && (
          <div className="relative mt-10">
            <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            <div className="flex justify-center">
              <button
                onClick={showMore}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition"
              >
                Show More
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
