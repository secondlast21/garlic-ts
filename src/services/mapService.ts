import api from "./api";

export interface BaseMapResponse {
  success: boolean;
  data: any;
}

export interface LandLocation {
  landLocationId?: number;
  provinceCode?: string;
  districtCode?: string;
}

export interface BaseAreaLocation {
  success: boolean;
  data: any;
}

export const getLand = async (body: LandLocation): Promise<BaseMapResponse> =>
  await api.get("/land-location/geometry", {
    params: {
      ...body,
    },
  });

export const getAreaLocation = async (): Promise<BaseAreaLocation> =>
  await api.get("/land-location/geometry/area-location");
