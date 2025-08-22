const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-10 border-t border-t-slate-600/[0.5]">
      <div className="mx-auto lg:px-32 md:px-10 sm:px-5 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-semibold">Batik Nusantara</h3>
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            Jl. Raya Batik No. 123, Kelurahan Warna Indah, Kecamatan Motif Baru,
            Kota Batik, Indonesia
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Batik Nusantara. All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-3">
          {[
            { label: "Beranda", path: "/" },
            { label: "Motif Batik", path: "/motif" },
            { label: "Model 3D", path: "/model-3d" },
            { label: "Blogs", path: "/blogs" },
            { label: "Gallery", path: "/gallery" },
            { label: "History", path: "/history" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
