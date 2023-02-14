import Navbar from "@/components/navbar/Navbar"
import dynamic from 'next/dynamic';


const Map = dynamic(import('../../components/MapSPT'), {
  ssr: false,
});

export default function Index() {
  return (
    <>
        <Navbar />
        <Map />
    </>
   )
}