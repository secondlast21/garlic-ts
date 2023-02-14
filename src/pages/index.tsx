import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap pt-40 mx-8">
        <div className="container mx-auto pb-40 w-7/12">
          <div className="text-7xl m-5 font-display font-semibold text-black">
            About INA
          </div>
          <div className="text-7xl m-5 font-display font-bold text-green-normal">
            Agro-GARLIC
          </div>
          <div className="m-5 font-display text-black text-justify	">
            {`INA Agro-GARLIC (Agroecological Assessment of Land Suitability for Garlic) adalah Sistem Informasi Geografis Kesesuaian Agroekologi untuk Bawang Putih pada kawasan prioritas pengembangan lahan bawang putih di Indonesia.
            Struktur klasifikasi kesesuaian lahan mengikuti kerangka FAO (1976)`}
          </div>
          <button className="btn btn-accent m-5 px-16"><Link href="#">{`More Info`}</Link></button>
        </div>
        <img
          src={`./new_garlic.png`}
          className="h-100 w-100 right-0 mx-auto bg-white"
          alt=""
        />
      </div>
      <div className="flex flex-wrap pt-40 mx-5">
        <img
          src={`./new_garlic.png`}
          className="h-100 w-100 right-0 mx-auto bg-white"
          alt=""
        />
        <div className="container mx-auto pb-40 w-7/12">
          <div className="text-7xl m-5 font-display font-semibold">
            About
          </div>
          <div className="text-7xl m-5 font-display font-bold">
            Bawang Putih
          </div>
          <div className="m-5 font-display text-black text-justify	">
            {`Bawang putih (Allium sativum L.) merupakan komoditas hortikultura
            yang penting bagi masyarakat Indonesia mengingat ragam dan jumlah
            pemanfaatannya. Selain dapat dimanfaatkan sebagai bahan penyedap
            makanan hampir di setiap masakan, komoditas ini juga berperan
            sebagai obat bagi beberapa jenis penyakit. Umbi bawang putih dapat
            digunakan untuk membantu menurunkan tekanan darah tinggi, mengobati
            gangguan pernafasan, sakit kepala, wasir, susah buang air besar,
            memar atau luka sayat, cacingan, insomnia, kolesterol, influenza,
            gangguan saluran kencing, dan lain-lain. Keadaan ini membawa dampak
            terhadap tingginya nilai ekonomis bawang putih di mata masyarakat
            Indonesia. Sumber: Panduan Budidaya Bawang Putih, Kementerian
            Pertanian Badan Penelitian dan Pengembangan Pertanian Balai
            Pengkajian Teknologi Pertanian Jawa Timur, Tahun 2018.`}
          </div>
          <button className="btn btn-accent m-5 px-16"><Link href="#">{`More Info`}</Link></button>
        </div>
      </div>
      <Footer />
    </>
  )
}
