import apiForm from "./apiForm";

export const postFile = async (body: any): Promise<any> =>
  await apiForm.post("/land-location/geometry", body);
