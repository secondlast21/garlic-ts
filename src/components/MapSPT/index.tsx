import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useQuery } from "react-query";
import { getLand } from "@/services/mapService";
import { LandLocation } from "@/services/mapService";
import { BaseMapResponse } from "@/services/mapService";
import { LatLngExpression } from "leaflet";
import { useState, useEffect } from "react";

const param: LandLocation = {
  districtCode: "3308",
};

export default function Index() {
  const [coordinates, setCoordinates] = useState<any>([]);

  const { data: dataLand, isFetched: isFetchedLand } =
    useQuery<BaseMapResponse>("getLandLocation", () => getLand(param));

  useEffect(() => {
    if (isFetchedLand) {
      const _coordinates = dataLand?.data.map((landLocation) => {
        return landLocation.geometryLandLocation.geometry.geometry.coordinates.map(
          (coorMap) => {
            let temp = coorMap.reverse();
            temp?.map((location) => location.reverse());
            return temp;
          }
        );
      });
      setCoordinates(_coordinates);
    }
  }, [isFetchedLand]);

  console.log(coordinates);

  // Define an object that maps land suitability class to colors
  const landSuitabilityColors: { [key: string]: any } = {
    4: { fillColor: "#33CC33", color: "#fff" },
    3: { fillColor: "#FFFF00", color: "#fff" },
    2: { fillColor: "#FF6600", color: "#fff" },
    1: { fillColor: "#FF0000", color: "#fff" },
  };

  return (
    <div>
      <MapContainer
        center={[-7.503168958076711, 110.18966941496906]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "1000px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isFetchedLand &&
          coordinates.map((polygonCoords: any, index: any) => {
            // Get the land suitability class of the polygon
            const landSuitabilityClass =
              dataLand?.data[index]?.observations[0]?.landSuitabilityClass;

            // Set the fill color and stroke color based on the land suitability class
            const { fillColor, color } = landSuitabilityColors[2] || {
              fillColor: "#000000",
              color: "#000000",
            };

            // const { fillColor, color } = landSuitabilityColors[
            //   landSuitabilityClass
            // ] || {
            //   fillColor: "#000000",
            //   color: "#000000",
            // };

            return (
              <Polygon
                key={index}
                pathOptions={{ fillColor, color, weight: 1, fillOpacity: 1 }}
                positions={polygonCoords}
              >
                <Popup>tes</Popup>
              </Polygon>
            );
          })}
      </MapContainer>
    </div>
  );
}
