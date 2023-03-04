import { getTokenFromLocalStorage } from "@/utils/tokenManager";
import { removeTokenFromLocalStorage } from "@/utils/tokenManager";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { BaseCurrentUser, currentUser } from "@/services/authService";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Profile() {
  const router = useRouter();

  const { data, isFetched } = useQuery<BaseCurrentUser>(
    "getCurrentUser",
    currentUser
  );

  if (isFetched) {
    console.log(data);
  }

  const handleClick = () => {
    removeTokenFromLocalStorage();
    const token2 = getTokenFromLocalStorage();
    console.log(token2);
    router.replace("/");
  };

  return (
    <div>
      <Head>
        <title>INA Agro-GARLIC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col ">
            <div className="flex-grow  overflow-y-auto paragraph">
              <main className="">
                <div className="container mx-auto mt-24 w-1/2 border-solid border-4 border-accent rounded-md">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex">
                      <div className="flex-grow px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Profil Pengguna
                        </h3>
                      </div>
                      <div className="flex-none px-4 py-5 sm:px-6 cursor-auto">
                        <button className=" leading-6 font-medium text-gray-900 hover:underline">
                          Edit Profil
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-accent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">
                            Nama Lengkap
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.name}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.email}
                          </dd>
                        </div>
                        <div className="bg-accent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">
                            Nomor Telepon
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.phone}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">
                            Pekerjaan
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.profession}
                          </dd>
                        </div>
                        <div className="bg-accent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">
                            Nama Institusi
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.institution.name}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">
                            Alamat Institusi
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.institution.address}
                          </dd>
                        </div>
                      </dl>
                      <div className="m-4">
                        <button
                          className="btn btn-ghost rounded-btn text-title"
                          onClick={handleClick}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
