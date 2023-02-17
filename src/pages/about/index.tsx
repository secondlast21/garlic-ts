import Head from "next/head"
import Navbar from "@/components/navbar/Navbar"

const kesesuaianLahan = [
    { 
        kelas: 'Kelas S1',  
        title: 'Lahan sangat sesuai untuk penanaman bawang putih', 
        atribut: 'w-96 h-56 bg-s1',
        modal: 'my-modal-1'
    },
    { 
        kelas: 'Kelas S2', 
        title: 'Lahan cukup sesuai untuk penanaman bawang putih',
        atribut: 'w-96 h-56 bg-s2',
        modal: 'my-modal-2'
    },
    { 
        kelas: 'Kelas S3', 
        title: 'Lahan hampir tidak sesuai untuk penanaman bawang putih',
        atribut: 'w-96 h-56 bg-s3',
        modal: 'my-modal-3'
    },
    { 
        kelas: 'Kelas N', 
        title: 'Lahan tidak sesuai untuk penanaman bawang putih',
        atribut: 'w-96 h-56 bg-n',
        modal: 'my-modal-4'
    },
]

export default function about() {
    return (
        <>
            <Head>
                <title>INA Agro-GARLIC</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className="flex-grow  overflow-y-auto paragraph">
                <main>
                    <div className="flex-grow bg-white">
                        <div className="p-4 mt-24">
                            <img src="/garlics.png" className="mx-auto w-128" alt="" />
                            <div className="mx-16 mt-16 mb-8 text-5xl font-bold text-center text-black">
                                    Apa itu INA Agro-GARLIC
                            </div>
                            <div className="flex flex-wrap">
                                <div className="mx-16 w-12/12 sm:7/12 md:7/12 text-lg text-center text-black">
                                    <div className="mb-6">
                                        <b>
                                            INA Agro-GARLIC (Agroecological Assessment of Land
                                            Suitability for Garlic) adalah Sistem Informasi
                                            Geografis Kesesuaian Agroekologi untuk Bawang Putih pada
                                            kawasan prioritas pengembangan lahan bawang putih di
                                            Indonesia.
                                        </b>
                                    </div>
                                    <b>
                                        Struktur klasifikasi kelas kesesuaian lahan mengikuti
                                        kerangka FAO (1976) yaitu{" "}
                                    </b>
                                    <div className="flex flex-row justify-center items-center">
                                        {kesesuaianLahan.map(({ kelas, title, atribut, modal }, idx) => (
                                            <div className="card card-compact w-80 bg-base-100 shadow-xl m-9">
                                                <figure><div className={atribut}></div></figure>
                                                <div className="card-body text-justify">
                                                    <h2 className="card-title font-bold">{kelas}</h2>
                                                    <p className="font-bold mb-3">{title}</p>
                                                    <div className="card-actions justify-end">
                                                        <label htmlFor={modal} className="btn btn-primary">Detail</label>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}