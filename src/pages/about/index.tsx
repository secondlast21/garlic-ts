import Head from "next/head"
import Navbar from "@/components/navbar/Navbar"
import Image from "next/image"
import garlics from "../../../public/garlics.png"

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

const variabelSyaratTumbuh = [
    { modal: 'my-modal-5', variabel: 'Faktor yang Tidak Dapat Dikendalikan dan Dikoreksi' },
    { modal: 'my-modal-6', variabel: 'Faktor yang Efeknya Dapat Dikoreksi' },
    { modal: 'my-modal-7', variabel: 'Faktor yang Dapat Dikendalikan' }    
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
                            <Image
                                src={garlics}
                                className="mx-auto w-128"
                                alt=""
                            />
                            <div className="mx-16 mt-16 mb-8 text-5xl font-bold text-center text-black">
                                    Apa itu INA Agro-GARLIC
                            </div>
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
                                <p>Struktur klasifikasi kelas kesesuaian lahan mengikuti
                                    kerangka FAO (1976) yaitu</p>
                                <div className="flex flex-row justify-center items-center">
                                    {kesesuaianLahan.map(({ kelas, title, atribut, modal }, idx) => (
                                        <div className="card card-compact w-80 bg-base-100 shadow-xl m-9" key={idx}>
                                            <figure><div className={atribut}></div></figure>
                                            <div className="card-body text-justify">
                                                <h2 className="card-title font-bold">{kelas}</h2>
                                                <p className="mb-3">{title}</p>
                                                <div className="card-actions justify-end">
                                                    <label htmlFor={modal} className="btn btn-accent">Detail</label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            <div className="mx-16 mt-16 mb-8 text-5xl font-bold text-center text-black">
                                    Syarat Tumbuh Bawang Putih
                            </div>
                            <div className="text-lg text-center text-black">
                                <div className="mb-6">
                                    <p>Syarat tumbuh bawang putih yang dianalisis dikelompokan ke dalam tiga kategori yaitu</p>
                                </div>
                                <div className="flex flex-row justify-center items-center">
                                    {variabelSyaratTumbuh.map(({ modal, variabel }, idx) => (
                                        <div className="card card-compact card-side w-80 bg-base-100 shadow-xl m-9" key={idx}>
                                            <div className="card-body">
                                                <h2 className="card-title font-bold mb-3 text-justify">{variabel}</h2>
                                                <div className="card-actions justify-end">
                                                    <label htmlFor={modal} className="btn btn-accent">Detail</label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p>*Informasi diatas bersumber dari Balai Besar Sumberdaya Lahan Pertanian</p>
                            </div>  
                            <div className="mx-16 mt-16 mb-8 text-5xl font-bold text-center text-black">
                                    Tim Peneliti
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}