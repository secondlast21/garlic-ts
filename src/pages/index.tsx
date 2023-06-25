import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import MainPageContent from "@/components/mainPageContent/MainPageContent";

export default function Home() {
  return (
    <div className="box-border">
      <Navbar />
      <MainPageContent />
      <Footer />
    </div>
  );
}
