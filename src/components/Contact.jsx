const Contact = () => {
  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Info Kontak */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-6">
              Kontak Kami
            </h2>
            <div className="space-y-6 text-white text-base md:text-lg">
              <p>
                <span className="font-semibold">Alamat:</span>
                <br />
                Jl. Raya Batik No. 123, Kelurahan Warna <br />
                Indah, Kecamatan Motif Baru, Kota Batik, Indonesia
              </p>
              <p>
                <span className="font-semibold">Telepon:</span>
                <br />
                (+62) 812-3456-7890
              </p>
              <p>
                <span className="font-semibold">Email:</span>
                <br />
                info@batiknusantara.co.id
              </p>
              <p>
                <span className="font-semibold">Jam Operasional:</span>
                <br />
                Senin – Jumat, 09:00 – 17:00 WIB
              </p>
            </div>
          </div>

          {/* Peta */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-lg h-[300px] md:h-[400px] lg:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.009843972945!2d112.60552317488349!3d-7.894037992128743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7881dad4337ebb%3A0xe39baa44cd10d225!2sBatik%20Tulis%20Lintang!5e0!3m2!1sid!2sid!4v1755851717260!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Batik Nusantara"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
