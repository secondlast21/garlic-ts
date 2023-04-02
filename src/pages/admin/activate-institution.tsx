import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import {
  getAllUser,
  getAllInstitution,
  BaseInstitutionResponse,
  TGetInstitution,
} from "@/services/adminService";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function ActivateInstitution() {
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
      console.log(dataInstitutionFalse);
    }

    if (isFetchedInstitutionTrue) {
      console.log(dataInstitutionTrue);
    }
  }, [dataInstitutionFalse, dataInstitutionTrue]);

  return (
    <>
      <NavbarAdmin />
      <h1>Aktivasi Institusi</h1>
    </>
  );
}
