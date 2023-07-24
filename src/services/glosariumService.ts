import api from './api'

export const getGrowthVariable = async (): Promise<any> => await api.get('/growth-variable/')
