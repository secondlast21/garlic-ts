import api from "./api";

export interface TDownload {
  landLocationId?: number;
  provinceCode?: string;
  districtCode?: string;
}

export const getDownloadArea = async (param: TDownload): Promise<any> =>
  await api.get(`/land-location/geometry/download-geometry`, {
    params: {
      ...param,
    },
    responseType: "blob",
  });

export const getDownloadExcelArea = async (param: TDownload): Promise<any> =>
  await api.get(`/land-location/geometry/download-soil-characteristic`, {
    params: {
      ...param,
    },
    responseType: "blob",
  });

export const getDownloadWeatherArea = async (param: TDownload): Promise<any> =>
  await api.get(`/land-location/geometry/download-daily-weather`, {
    params: {
      ...param,
    },
    responseType: "blob",
  });

export const getAllArea = async (): Promise<any> =>
  await api.get("/land-location/geometry/area-location");
