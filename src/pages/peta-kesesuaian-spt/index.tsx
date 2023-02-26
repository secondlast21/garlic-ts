import NavbarMap from "@/components/navbar/NavbarMap";
import dynamic from "next/dynamic";

const Map = dynamic(import("../../components/MapSPT"), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <NavbarMap />
      <Map />
    </>
  );
}
