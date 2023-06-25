import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import garlics from "../../../public/garlics.png";
import ApaItuInaAgroGarlic from "@/components/about/ApaItuInaAgroGarlic";
import SyaratTumbuhBawangPutih from "@/components/about/SyaratTumbuhBawangPutih";
import TimPeneliti from "@/components/about/TimPeneliti";

export default function about() {
  return (
    <div>
      <Head>
        <title>INA Agro-GARLIC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex-grow overflow-y-auto paragraph box-border">
        <main>
          <div className="flex-grow bg-white">
            <div className="p-4 mt-24">
              <Image src={garlics} className="mx-auto w-128" alt="" />
              <ApaItuInaAgroGarlic />
              <SyaratTumbuhBawangPutih />
              <TimPeneliti />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
