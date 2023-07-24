import api from './api'

export const postService = async (body: any): Promise<any> => await api.post('/land-location/user', body)
