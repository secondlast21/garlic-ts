import Navbar from "@/components/navbar/Navbar";
import { SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import Head from "next/head";
import { extendUser } from "@/services/authService";
import Swal from "sweetalert2";
import { capitalizeEveryWord } from "@/utils/utils";

export default function ExtendAccount() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, reset } = useMutation(extendUser, {
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berhasil melakukan permintaan",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success",
        },
        confirmButtonText: "Kembali",
      });
    },
    onError: (error: any) => {
      if (error?.message) {
        setErrorMessage(error?.message);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: errorMessage,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-error",
          },
          confirmButtonText: "Kembali",
        });
      } else if (error?.errors) {
        const source = error?.errors?.[0]?.source;
        const msg = error?.errors?.[0]?.message;
        const errorMsg = `${source} ${msg}`;
        setErrorMessage(capitalizeEveryWord(errorMsg));
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: errorMessage,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-error",
          },
          confirmButtonText: "Kembali",
        });
      } else {
        setErrorMessage("Kesalahan Jaringan");
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: errorMessage,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-error",
          },
          confirmButtonText: "Kembali",
        });
      }
    },
  });

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data = { email };
    console.log(data);
    mutate(data);
  };

  return (
    <div>
      <Head>
        <title>INA Agro-GARLIC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="min-h-screen font-display flex bg-accent items-center justify-center w-full px-4 sm:px-6 lg:px-8">
          <div className="card w-fit bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Perpanjangan Masa Akun INA-Agro Garlic
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text">Masukkan email anda</span>
                  </label>
                  <label className="input-group">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="Email anda"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="card-actions justify-center">
                  <button className="btn btn-s1" type="submit">
                    Minta Perpanjangan Akun
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
