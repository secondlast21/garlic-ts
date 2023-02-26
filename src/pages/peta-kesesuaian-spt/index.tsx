import NavbarMap from "@/components/navbar/NavbarMap";
import dynamic from "next/dynamic";
import Head from "next/head";

const Map = dynamic(import("../../components/MapSPT"), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <Head>
        <title>INA Agro-GARLIC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarMap />
      <Map />
    </>
  );
}
