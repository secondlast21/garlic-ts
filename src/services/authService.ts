import api from "./api";

export interface TLogin {
    email: string
    password: string
}
  
export interface TRegister extends TLogin {
    name: string
    phone: string
    profession: string
    need: string
    institutionId: string
    institutionName: string
    institutionAddress: string
}
  
export const login = async (body: TLogin): Promise<any> => await api.post('/user/login', body)
export const register = async (body: TRegister): Promise<any> => await api.post('/user/register', body)
  