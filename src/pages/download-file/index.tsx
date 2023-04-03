import {
  getAllArea,
  getDownloadArea,
  getDownloadExcelArea,
  getDownloadWeatherArea,
} from "@/services/downloadService";
import { useMutation, useQuery } from "react-query";
import Navbar from "@/components/navbar/Navbar";
import fileDownload from "js-file-download";
import { TDownload } from "@/services/downloadService";
import { useState, useEffect } from "react";
import RequireAuth from "@/components/Auth";

export default function DownloadFile() {
  const [bpsCode, setBpsCode] = useState([]);
  const { data: dataAllArea, isFetched: isFetchedAllArea } = useQuery<any>(
    "getAllArea",
    getAllArea
  );

  const { mutateAsync: mutateSHP } = useMutation(getDownloadArea);
  const { mutateAsync: mutateSoil } = useMutation(getDownloadExcelArea);
  const { mutateAsync: mutateWeather } = useMutation(getDownloadWeatherArea);

  const onDownloadSHPFile = async (
    districtCodeNumber: string,
    districtName: string
  ) => {
    try {
      const param: TDownload = {
        districtCode: districtCodeNumber,
      };
      const response = await mutateSHP(param);
      fileDownload(response, `SHP ${districtName}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onDownloadSoilFile = async (
    districtCodeNumber: string,
    districtName: string
  ) => {
    try {
      const param: TDownload = {
        districtCode: districtCodeNumber,
      };
      const response = await mutateSoil(param);
      fileDownload(response, `Karakteristik Tanah ${districtName}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onDownloadWeatherFile = async (
    districtCodeNumber: string,
    districtName: string
  ) => {
    try {
      const param: TDownload = {
        districtCode: districtCodeNumber,
      };
      const response = await mutateWeather(param);
      fileDownload(response, `Cuaca ${districtName}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFetchedAllArea) {
      console.log(dataAllArea);

      let collectBpsCode: any = [];
      dataAllArea.data?.forEach((item: any) => {
        const getDistrictByBpsCode = item?.filter(
          (item: any) => item?.type === "district"
        );
        collectBpsCode.push(...getDistrictByBpsCode);
      });
      setBpsCode(collectBpsCode);

      console.log(collectBpsCode);
    }
  }, [dataAllArea, isFetchedAllArea]);

  console.log(bpsCode);

  return (
    <RequireAuth>
      <>
        <Navbar />
        <div className="bg-emerald-300 h-full w-full">
          <div className="m-0 absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-2xl m-5 font-black">
              <strong>Download File</strong>
            </h1>
            <table className="table-fixed border-collapse border border-black rounded-xl">
              <thead>
                <tr>
                  <th className="px-40 py-3 border-b border-black bg-accent font-black">
                    Nama Daerah
                  </th>
                  <th className="px-40 py-3 border-b border-black bg-accent font-black">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {bpsCode.map(({ name, bpsCode }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black">{name}</td>
                    <td className="border-b border-t border-black">
                      <button
                        className="btn btn-accent m-3 px-8"
                        onClick={() => onDownloadSHPFile(bpsCode, name)}
                      >
                        SHP
                      </button>
                      <button
                        className="btn btn-accent m-3 px-8"
                        onClick={() => onDownloadSoilFile(bpsCode, name)}
                      >
                        Soil
                      </button>
                      <button
                        className="btn btn-accent m-3 px-8"
                        onClick={() => onDownloadWeatherFile(bpsCode, name)}
                      >
                        Weather
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </RequireAuth>
  );
}
