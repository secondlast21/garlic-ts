import Navbar from "@/components/navbar/Navbar";
import { SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import Head from "next/head";
import { extendUser, BaseExtendUser } from "@/services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, reset } = useMutation(extendUser, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      setErrorMessage(error?.message);
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
