import Image from "next/image";
import garlic from "../../../public/garlic_cover.jpg";

export default function LoginWelcome() {
  return (
    <div className="text-center font-bold w-full text-black">
      <Image
        src={garlic}
        className=" w-64 h-64 right-0 mb-20 mx-auto rounded-full  object-cover"
        alt=""
      />
      <h1 className="text-5xl">
        Selamat Datang di <br />
        INA-AGRO Garlic
      </h1>
      <br />
      <br />
      <p className="text-2xl">
        Silahkan Masuk untuk Mengakses Fitur-Fitur Lainnya
      </p>
    </div>
  );
}
