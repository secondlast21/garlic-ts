import api from "./api";

export interface TLogin {
  email: string;
  password: string;
}

export interface TRegister extends TLogin {
  name: string;
  phone: string;
  profession: string;
  need: string;
  institutionList: string;
  institutionId: string;
  institutionName: string;
  institutionAddress: string;
}

export interface BaseCurrentUser {
  success: boolean;
  data: any;
}

export interface BaseExtendUser {
  email: string;
}

export const login = async (body: TLogin): Promise<any> =>
  await api.post("/user/login", body);
export const register = async (body: TRegister): Promise<any> =>
  await api.post("/user/register", body);
export const currentUser = async (): Promise<BaseCurrentUser> =>
  await api.get("user/current");
export const extendUser = async (body: BaseExtendUser): Promise<any> =>
  await api.post("/user/request-extend", body);
