import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalCardRunner({ items = [] }) {
  const containerRef = useRef(null);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const defaultItems = [
    {
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      title: "Modern Technology",
      desc: "Explore the latest in tech innovation and digital transformation",
    },
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      title: "Web Development",
      desc: "Building responsive and interactive web applications",
    },
    {
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      title: "Mobile Apps",
      desc: "Creating seamless mobile experiences for users",
    },
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      title: "Data Analytics",
      desc: "Transforming data into actionable business insights",
    },
    {
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      title: "Digital Marketing",
      desc: "Reaching audiences through strategic digital campaigns",
    },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        container.scrollLeft = scrollWidth / 3;
      }
      else if (scrollLeft <= 1) {
        container.scrollLeft = (scrollWidth / 3) * 2 - clientWidth;
      }
    };

    container.addEventListener("scroll", handleScroll);

    container.scrollLeft = container.scrollWidth / 3;

    return () => container.removeEventListener("scroll", handleScroll);
  }, [displayItems]);

  useEffect(() => {
    if (isAnimationPaused) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isAnimationPaused]);

  const scrollLeft = () => {
    setIsAnimationPaused(true);
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(() => setIsAnimationPaused(false), 2000);
  };

  const scrollRight = () => {
    setIsAnimationPaused(true);
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(() => setIsAnimationPaused(false), 2000);
  };

  const handleMouseEnter = () => setIsAnimationPaused(true);
  const handleMouseLeave = () => setIsAnimationPaused(false);

  return (
    <div className="w-full relative py-8 bg-black">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex gap-6">
          {[...Array(3)].map((_, setIndex) =>
            displayItems.map((item, idx) => (
              <div
                key={`${setIndex}-${idx}`}
                className="w-80 shrink-0 rounded-xl overflow-hidden border border-white/20 bg-[#141414] shadow-lg"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-3 space-y-1">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={scrollLeft}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
