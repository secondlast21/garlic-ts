import api from './api'

export interface BaseMapResponse {
  success: boolean
  data: Array<TGeometryLandLocation>
}

export interface Properties {
  name: string
}

export interface Crs {
  type: string
  properties: Properties
}

export interface GeometryChild {
  crs: Crs
  type: string
  coordinates: Array<Array<Array<number>>>
  smuArea: string
  smuAreaPercentage: string
  createdAt: string
  updatedAt: string
}

export interface Geometry {
  id: string
  smuNumber: string
  geometry: GeometryChild
  createdAt: string
  updatedAt: string
}

export interface Proportion {
  id: string
  code: string
  name: string
  percentage: string
  createdAt: string
  updatedAt: string
}

export interface SoilCharacteristic {
  id: string
  landClassification: string
  soilType: string
  parentMaterial: string
  landform: string
  proportion: Proportion
  createdAt: string
  updatedAt: string
}

export interface GeometryLandLocation {
  id: string
  geometry: Geometry
  soilCharacteristic: SoilCharacteristic
  createdAt: string
  updatedAt: string
}

export interface AreaLocation {
  id: string
  type: string
  bpsCode: string
  bmkgCode: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface PointLocation {
  id: string
  latitude: string
  longitude: string
  createdAt: string
  updatedAt: string
}

export interface GrowthVariable {
  id: string
  variable: string
  type: string
  class: string
  lowerLimitInterval: string
  upperLimitInterval: string
  recommendation: string
  createdAt: string
  updatedAt: string
}

export interface LandSuitabilityClass {
  id: string
  land: string
  weatherFactor: string
  reliefFactor: string
  uncorrectableAndUncontrollableFactor: string
  correctableFactor: string
  controllableFactor: string
  createdAt: string
  updatedAt: string
}

export interface Observation {
  id: string
  observationDate: string
  growthVariables: GrowthVariable[]
  landSuitabilityClass: LandSuitabilityClass
  createdAt: string
  updatedAt: string
}

export interface TGeometryLandLocation {
  id: string
  landName: string
  geometryLandLocation: GeometryLandLocation
  areaLocations: AreaLocation[]
  pointLocation: PointLocation
  observations: Observation[]
  createdAt: string
  updatedAt: string
}

export interface LandLocation {
  landLocationId?: number
  provinceCode?: string
  districtCode?: string
}

export interface BaseAreaLocation {
  success: boolean
  data: any
}

export const getLand = async (body: LandLocation): Promise<BaseMapResponse> =>
  await api.get('/land-location/geometry', {
    params: {
      ...body,
    },
  })

export const getAreaLocation = async (): Promise<BaseAreaLocation> =>
  await api.get('/land-location/geometry/area-location')
