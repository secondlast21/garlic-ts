import api from "./api";

export interface BaseResponse {
  success: boolean;
  data: Array<TGetInstitution>;
}

export interface TPostInstitution {
  name: string;
  address: string;
  isActive: boolean;
}

export interface TGetInstitution extends TPostInstitution {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const getInstitution = async (): Promise<BaseResponse> =>
  await api.get("/user/institution");
