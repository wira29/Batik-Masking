import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlurText from "../../components/react-bits/BlurText/BlurText";
import Footer from "../../components/Footer";

export const Index = () => {
  const steps = [
    {
      title: "1. Masuk ke Halaman 3D",
      desc: "Saat pertama kali membuka halaman, kamu akan melihat tampilan 3D di sebelah kiri, dan sebuah container di sebelah kanan. Container ini berfungsi untuk menampilkan potongan pakaian yang bisa kamu tempel dengan motif batik.",
      img: "/steps/step-1.png",
    },
    {
      title: "2. Tombol Navigasi di Sebelah Kiri",
      desc: "Di sisi kiri layar terdapat 4 tombol utama: kembali, pilih model 3D, pilih motif batik, dan tombol checklist untuk menerapkan motif. Semua interaksi utama dilakukan lewat tombol ini.",
      img: "/steps/step-2.png",
    },
    {
      title: "3. Pilih Model 3D",
      desc: "Klik tombol bergambar baju untuk membuka pilihan model 3D. Kamu bisa memilih pakaian pria, wanita, tas, dan model lainnya. Model yang dipilih akan langsung tampil di tampilan 3D.",
      img: "/steps/step-3.png",
    },
    {
      title: "4. Pilih Motif Batik",
      desc: "Klik tombol bergambar palet warna untuk membuka koleksi motif batik. Pilih salah satu motif yang kamu suka, dan motif tersebut akan otomatis muncul di container potongan pakaian di sebelah kanan.",
      img: "/steps/step-7.png",
    },
    {
      title: "5. Atur Motif di Container",
      desc: "Motif yang sudah kamu pilih bisa digeser atau diposisikan di dalam container. Container ini berisi potongan bagian pakaian, seperti depan, belakang, samping, kerah, atau lengan.",
      img: "/steps/step-4.png",
    },
    {
      title: "6. Geser & Atur Motif pada Pakaian",
      desc: "Drag (geser) motif batik ke sisi pakaian yang kamu inginkan. Misalnya, letakkan motif di sisi depan pakaian atau hanya di lengan. Kamu juga bisa memperbesar atau memperkecil ukuran motif (resize) dengan ikon panah merah, serta memutarnya (rotate) dengan ikon panah kuning sesuai kreativitasmu.",
      img: "/steps/step-5.png",
    },
   {
  title: "7. Crop Motif Batik",
  desc: "Jika ingin mengambil bagian tertentu dari motif batik, gunakan fitur crop. Double-click (klik 2x) pada motif, atau tekan tombol 'C' di keyboard untuk membuka modal crop. Di dalam modal, gunakan kotak putih untuk memilih area motif: drag untuk memindahkan posisi kotak, atau tarik sudutnya untuk mengubah ukuran crop. Setelah sesuai, klik 'Apply Crop' untuk menerapkan, atau 'Reset' untuk mengulang.",
  img: "/steps/step-8.png",
},
    {
      title: "8. Terapkan Motif ke Model 3D",
      desc: "Jika kamu sudah puas dengan penempatan motif, klik tombol checklist. Sistem akan menerapkan motif yang ada di container ke model 3D secara otomatis, sehingga pakaian 3D akan memiliki corak batik sesuai aturannya.",
      img: "/steps/step-6.png",
    },
    {
      title: "9. Ulangi atau Ganti Desain",
      desc: "Kamu bisa kembali memilih model lain, memilih motif baru, atau mengatur ulang posisi motif kapan saja. Proses ini bisa diulang sesuka hati sampai kamu mendapatkan hasil desain batik yang paling cocok.",
      img: "/steps/step-9.png",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black px-6 md:px-20 py-10 text-white overflow-hidden">
      <div>
        <div className="flex justify-start">
          <button
            onClick={() => window.history.back()}
            className="p-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg"
          >
            <ArrowLeft />
          </button>
        </div>

        <div className="content py-10 md:py-20 text-center flex justify-center flex-col">
          <BlurText
            className="font-bold text-4xl md:text-6xl text-center lg:mx-auto"
            text="Tutorial"
            delay={1000}
          />
          <BlurText
            className="font-light text-slate-300 mt-4 text-base md:text-lg mx-auto"
            text="Ikuti langkah-langkah berikut untuk menggunakan halaman 3D interaktif."
          />
        </div>

        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.3 }}
                viewport={{ once: true }}
              >
                <img
                  src={step.img}
                  alt={step.title}
                  className="rounded-2xl shadow-lg border border-slate-800 hover:scale-105 transition-transform duration-300"
                />
              </motion.div>

              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                  {step.title}
                </h2>
                <p className="text-slate-300 leading-relaxed">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
