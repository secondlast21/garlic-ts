import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import { getAllUser } from "@/services/adminService";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function ExtendUser() {
  const { data: dataUser, isFetched: isFetchedUser } = useQuery<any>(
    "getAllArea",
    getAllUser
  );
  const [allUser, setAlluser] = useState([]);

  function millisToDate(input: number) {
    const date = new Date(input);
    return date.toLocaleString("en-GB");
  }

  // console.log(new Date().toLocaleDateString("en-GB"));

  useEffect(() => {
    if (isFetchedUser) {
      console.log(dataUser);
      console.log(dataUser?.data);
      setAlluser(dataUser?.data);
      console.log(allUser);
      dataUser?.data.map((data: any) => {
        console.log(millisToDate(Number(data.activeUntil)));
      });
    }
  }, [dataUser]);

  return (
    <>
      <NavbarAdmin />
      <div>
        <h1>Perpanjang Masa Aktif Pengguna</h1>
        {dataUser?.data.map((data: any, idx: number) => (
          <h1 key={idx}>{millisToDate(Number(data.activeUntil))}</h1>
        ))}
      </div>
    </>
  );
}
