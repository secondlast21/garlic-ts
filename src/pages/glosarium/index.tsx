import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

export default function glosarium() {
  return (
    <div>
      <Head>
        <title>INA Agro-GARLIC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <h1>Ini Halaman Glosarium</h1>
      <p>Testestes</p>
      <Footer />
    </div>
  );
}
