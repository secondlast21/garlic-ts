import api from './api'

export interface BaseGrowthResponse {
  success: boolean
  data: Array<GrowthVariableResponse>
}

export interface GrowthVariableResponse {
  id: string
  variable: string
  type: string
  class: string
  lower_limit_interval: string
  upper_limit_interval: string
  recommendation: string
  createdAt: string
  updatedAt: string
}

export interface TObservation {
  temperatureId: number
  rainfallId: number
  sunshineDurationId: number
  solarRadiationId: number
  elevationId: number
  reliefId: number
  soilMineralDepthId: number
  baseSaturationId: number
  soilAcidityId: number
  drainageId: number
  soilTextureId: number
  cationExchangeCapacityId: number
  observationDate: number
}

export const getGrowthVariable = async (): Promise<BaseGrowthResponse> => await api.get('/growth-variable')
