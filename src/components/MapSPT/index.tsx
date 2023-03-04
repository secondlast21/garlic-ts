import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useQuery } from "react-query";
import { getLand, TGeometryLandLocation } from "@/services/mapService";
import { LandLocation } from "@/services/mapService";
import {
  BaseAreaLocation,
  getAreaLocation,
  BaseMapResponse,
} from "@/services/mapService";
import L, { CRS } from "leaflet";
import { convertCoordinates } from "@/utils/utils";
import proj4 from "proj4";
import Proj4 from "proj4leaflet";

const param: LandLocation = {
  districtCode: "3308",
};

const EPSG4326 = new L.Proj.CRS(
  "EPSG:4326",
  "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
  {
    resolutions: [
      4000, 2000, 1000, 500, 250, 125, 62.5, 31.25, 15.625, 7.8125, 3.90625,
      1.953125, 0.9765625, 0.48828125, 0.244140625, 0.122070313, 0.061035156,
      0.030517578, 0.015258789,
    ],
    origin: [-180, +90],
  }
);

let parsedDataLand: Array<TGeometryLandLocation>;

export default function Index() {
  const purpleOptions = { color: "purple" };

  const { data: dataLand, isFetched: isFetchedLand } =
    useQuery<BaseMapResponse>("getLandLocation", () => getLand(param));

  const { data: dataArea, isFetched: isFetchedArea } =
    useQuery<BaseAreaLocation>("getAreaLocation", getAreaLocation);

  if (isFetchedLand) {
    console.log("Ini Land");
    console.log(dataLand);
    console.log(
      dataLand?.data[0].geometryLandLocation.geometry.geometry.coordinates[0][0]
    );
    console.log("TOT");
    console.log(
      dataLand?.data[150].geometryLandLocation.geometry.geometry.coordinates
    );
    console.log(
      dataLand?.data[150].geometryLandLocation.geometry.geometry
        .coordinates[0][0][0]
    );
    console.log("Number 150");
    console.log(
      Number(
        dataLand?.data[150].geometryLandLocation.geometry.geometry
          .coordinates[0][0][0]
      )
    );

    parsedDataLand = dataLand?.data.map((landLocation, idx) => {
      landLocation.geometryLandLocation.geometry.geometry.coordinates[0] =
        landLocation.geometryLandLocation.geometry.geometry.coordinates[0].map(
          (data) => {
            return proj4("EPSG:4326", "EPSG:3857", [2, 5]);
            // return convertCoordinates(data[0], data[1]) as any;
          }
        );
      return landLocation;
    }) as TGeometryLandLocation[];
    console.log("Ini Data Lans Parsed");
    console.log(parsedDataLand);
  }

  if (isFetchedArea) {
    console.log("Ini Area");
    console.log(dataArea?.data?.[0][1]?.bpsCode);
  }
  return (
    <div>
      <MapContainer
        center={[-6.5622152, 106.7376266]}
        zoom={100}
        scrollWheelZoom={true}
        style={{ height: "1000px", width: "100%" }}
        className="z-0"
        crs={EPSG4326}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isFetchedLand &&
          dataLand?.data.map((landLocation, idx) => (
            <Polygon
              pathOptions={purpleOptions}
              positions={
                landLocation.geometryLandLocation.geometry.geometry
                  .coordinates[0] as [number, number][]
              }
              key={idx}
            />
          ))}
        <Marker position={[-6.5622152, 106.7376266]}>
          <Popup>{dataArea?.data?.[0][1]?.bpsCode}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
