import Head from "next/head"
import Navbar from "@/components/navbar/Navbar"

export default function about() {
    return (
        <>
            <Head>
                <title>INA Agro-GARLIC</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className="flex flex-col font-display h-screen">
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex flex-1 flex-col ">
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
                                                <b>INA Agro-GARLIC (Agroecological Assessment of Land
                                                Suitability for Garlic) adalah Sistem Informasi
                                                Geografis Kesesuaian Agroekologi untuk Bawang Putih pada
                                                kawasan prioritas pengembangan lahan bawang putih di
                                                Indonesia.</b>
                                                <br />
                                                <br />
                                                <b>
                                                    Struktur klasifikasi kesesuaian lahan mengikuti
                                                    kerangka FAO (1976) yaitu{" "}
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}