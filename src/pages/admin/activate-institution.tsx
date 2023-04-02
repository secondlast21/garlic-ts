import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import {
  getAllInstitution,
  BaseInstitutionResponse,
  TGetInstitution,
} from "@/services/adminService";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { formatMillis } from "@/utils/utils";
import Footer from "@/components/footer/Footer";

export default function ActivateInstitution() {
  const [allActiveInstitution, setAllActiveInstitution] = useState<any>();
  const [allInActiveInstitution, setAllInActiveInstitution] = useState<any>();

  const paramFalse: TGetInstitution = {
    isActive: false,
  };
  const paramTrue: TGetInstitution = {
    isActive: true,
  };
  const { data: dataInstitutionFalse, isFetched: isFetchedInstitutionFalse } =
    useQuery<BaseInstitutionResponse>("getAllInstitutionFalse", () =>
      getAllInstitution(paramFalse)
    );
  const { data: dataInstitutionTrue, isFetched: isFetchedInstitutionTrue } =
    useQuery<BaseInstitutionResponse>("getAllInstitutionTrue", () =>
      getAllInstitution(paramTrue)
    );

  useEffect(() => {
    if (isFetchedInstitutionFalse) {
      setAllInActiveInstitution(dataInstitutionFalse?.data);
      console.log(dataInstitutionFalse);
    }

    if (isFetchedInstitutionTrue) {
      setAllActiveInstitution(dataInstitutionTrue?.data);
      console.log(dataInstitutionTrue);
    }
  }, [dataInstitutionFalse, dataInstitutionTrue]);

  return (
    <>
      <NavbarAdmin />
      <div className="py-40 px-20">
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Daftar Institusi Aktif
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Daftar Institusi Aktif
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Nama Institusi
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Alamat
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Tanggal Didaftarkan
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allActiveInstitution?.map(
                      (institution: any, idx: number) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {institution.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {institution.address}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatMillis(
                              Number(institution.createdAt),
                              "EEEE, dd/MM/yyyy"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {institution.isActive ? "Aktif" : "Tidak Aktif"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
