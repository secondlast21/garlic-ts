import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import {
  getAllUser,
  activateUser,
  BaseUserResponse,
  DatumUser,
} from "@/services/adminService";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { isExpired } from "@/utils/utils";
import { formatMillis } from "@/utils/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import RequireAuth from "@/components/Auth";

export default function Admin() {
  const queryClient = useQueryClient();
  const { data: dataUser, isFetched: isFetchedUser } = useQuery<any>(
    "getAllUser",
    getAllUser
  );
  const [allActiveUser, setAllActiveUser] = useState([]);
  const [allInActiveUser, setAllInActiveUser] = useState([]);
  const [newUser, setNewUser] = useState<any>([]);
  const [needExtend, setNeedExtend] = useState<any>([]);
  const [noNeedExtend, setNoNeedExtend] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, reset } = useMutation(activateUser, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("getAllUser");
    },
    onError: (error: any) => {
      setErrorMessage(error?.message);
    },
  });

  const onSubmit = (id: number) => {
    mutate(id);
  };

  useEffect(() => {
    if (isFetchedUser) {
      console.log(dataUser);
      const modifyInActiveData = dataUser?.data.filter((data: any) => {
        const date = Number(data.activeUntil);
        if (isExpired(date)) return;
        return data;
      });
      const modifyActiveData = dataUser?.data.filter((data: any) => {
        const date = Number(data.activeUntil);
        if (!isExpired(date)) return;
        return data;
      });

      const currentTimeInMillis = Date.now();

      const newUserData: BaseUserResponse[] = modifyInActiveData.filter(
        (data: DatumUser) => {
          if (data.activeUntil === null) {
            return true; // user is new
          } else if (
            Number(data.activeUntil) < currentTimeInMillis &&
            data.isNeedExtend
          ) {
            return true; // user is inactive and needs activation extension
          } else if (
            Number(data.activeUntil) < currentTimeInMillis &&
            !data.isNeedExtend
          ) {
            return true; // user is inactive and doesn't need activation extension
          } else {
            return false; // user is active
          }
        }
      );

      const modifyNewData = newUserData.filter(
        (data: any) => data.activeUntil === null
      );
      const needExtendData = newUserData.filter(
        (data: any) => data.isNeedExtend && data.activeUntil !== null
      );
      const noNeedExtendData = newUserData.filter(
        (data: any) => !data.isNeedExtend && data.activeUntil !== null
      );
      console.log(modifyActiveData);
      console.log(modifyInActiveData);
      console.log(modifyNewData);
      console.log(needExtendData);
      console.log(noNeedExtendData);
      setAllActiveUser(modifyActiveData);
      setAllInActiveUser(modifyInActiveData);
      setNewUser(modifyNewData);
      setNeedExtend(needExtendData);
      setNoNeedExtend(noNeedExtendData);
    }
  }, [dataUser, isFetchedUser]);

  return (
    <RequireAuth>
      <>
        <NavbarAdmin />
        <div className="py-40 px-20">
          <div className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Daftar Pengguna Baru
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Daftar Pengguna Baru
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
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Tanggal Dibuat
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Masa Berlaku
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {newUser.map((person: any, idx: number) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatMillis(
                              Number(person.createdAt),
                              "EEEE, dd/MM/yyyy"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {Number(person.activeUntil)
                              ? formatMillis(
                                  Number(person.activeUntil),
                                  "EEEE, dd/MM/yyyy"
                                )
                              : "Akun belum aktif"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {capitalizeFirstLetter(person.role)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <button
                              onClick={() => onSubmit(Number(person.id))}
                              className="py-2 px-4 bg-s1 rounded-lg text-white"
                            >
                              Aktifkan User
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Daftar Pengguna Tidak Aktif & Butuh Perpanjangan Akun
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Daftar Pengguna Tidak Aktif & Butuh Perpanjangan Akun
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
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Tanggal Dibuat
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Masa Berlaku
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {needExtend.map((person: any, idx: number) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatMillis(
                              Number(person.createdAt),
                              "EEEE, dd/MM/yyyy"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {Number(person.activeUntil)
                              ? formatMillis(
                                  Number(person.activeUntil),
                                  "EEEE, dd/MM/yyyy"
                                )
                              : "Akun belum aktif"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {capitalizeFirstLetter(person.role)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <button
                              onClick={() => onSubmit(Number(person.id))}
                              className="py-2 px-4 bg-s1 rounded-lg text-white"
                            >
                              Aktifkan User
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Daftar Pengguna Tidak Aktif & Tidak Butuh Perpanjangan Akun
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Daftar Pengguna Tidak Aktif & Tidak Butuh Perpanjangan Akun
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
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Tanggal Dibuat
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Masa Berlaku
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {noNeedExtend.map((person: any, idx: number) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatMillis(
                              Number(person.createdAt),
                              "EEEE, dd/MM/yyyy"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {Number(person.activeUntil)
                              ? formatMillis(
                                  Number(person.activeUntil),
                                  "EEEE, dd/MM/yyyy"
                                )
                              : "Akun belum aktif"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {capitalizeFirstLetter(person.role)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Daftar Pengguna Aktif
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Daftar Pengguna Aktif
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
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Tanggal Dibuat
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Masa Berlaku
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {allActiveUser.map((person: any, idx) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatMillis(
                              Number(person.createdAt),
                              "EEEE, dd/MM/yyyy"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {Number(person.activeUntil)
                              ? formatMillis(
                                  Number(person.activeUntil),
                                  "EEEE, dd/MM/yyyy"
                                )
                              : "Akun belum aktif"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {capitalizeFirstLetter(person.role)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </RequireAuth>
  );
}
