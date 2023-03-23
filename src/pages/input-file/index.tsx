import FormikInput from "@/components/inputFile/FormikInput";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";

export default function inputFile() {
  return (
    <div className="bg-s1">
      <Navbar />
      <div className="text-center p-24 ">
        <FormikInput />
      </div>
    </div>
  );
}
