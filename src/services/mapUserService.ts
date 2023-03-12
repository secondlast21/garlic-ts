import api from "./api";

export interface AreaLocation {
  id: string;
  type: string;
  bpsCode: string;
  bmkgCode: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface PointLocation {
  id: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
}

export interface GrowthVariable {
  id: string;
  variable: string;
  type: string;
  class: string;
  lowerLimitInterval: string;
  upperLimitInterval: string;
  recommendation: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandSuitabilityClass {
  id: string;
  land: string;
  weatherFactor: string;
  reliefFactor: string;
  uncorrectableAndUncontrollableFactor: string;
  correctableFactor: string;
  controllableFactor: string;
  createdAt: string;
  updatedAt: string;
}

export interface Observation {
  id: string;
  observationDate: string;
  createdAt: string;
  updatedAt: string;
  growthVariables: GrowthVariable[];
  landSuitabilityClass: LandSuitabilityClass;
}

export interface Datum {
  id: string;
  landName: string;
  createdAt: string;
  updatedAt: string;
  areaLocations: AreaLocation[];
  pointLocation: PointLocation;
  observations: Observation[];
}

export interface BaseUserAreaLocation {
  success: boolean;
  data: Datum[];
}

export const getUserAreaLocation = async (): Promise<BaseUserAreaLocation> =>
  await api.get("/land-location/user");
