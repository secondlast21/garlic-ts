import Navbar from "@/components/navbar/Navbar";
import PenilaianKesesuaianLahanForm from "@/components/penilaianKesesuaianLahan/PenilaianKesesuaianLahanForm.jsx";
import RequireAuth from "@/components/Auth";

export default function PenilaianKesesuaianLahan() {
  return (
    <RequireAuth>
      <>
        <Navbar />
        <PenilaianKesesuaianLahanForm />
      </>
    </RequireAuth>
  );
}
