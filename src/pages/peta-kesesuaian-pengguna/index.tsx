import Navbar from "@/components/navbar/Navbar"
import dynamic from 'next/dynamic';


const Map = dynamic(import('../../components/MapPengguna'), {
  ssr: false,
});

export default function Index() {
   return (
    <>
        <Navbar />
        <div className="flex font-display flex-col h-screen bg-white">
            <div className="  overflow-y-auto paragraph">
                <main>
                <div className="flex-grow bg-white">
                    <Map />
                </div>
                </main>
            </div>
        </div>
    </>
   )
}