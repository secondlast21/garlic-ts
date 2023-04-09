import {
  MapContainer,
  TileLayer,
  Popup,
  Polygon,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useQuery } from "react-query";
import { getLand } from "@/services/mapService";
import { LandLocation } from "@/services/mapService";
import { BaseMapResponse } from "@/services/mapService";
import { useState, useEffect, useRef } from "react";
import { setBg, setTitle } from "@/utils/utils";

const param: LandLocation = {
  districtCode: "3308",
};

export default function Index() {
  const [coordinates, setCoordinates] = useState<any>([]);

  const { data: dataLand, isFetched: isFetchedLand } =
    useQuery<BaseMapResponse>("getLandLocation", () => getLand(param));

  console.log(dataLand);

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

  // const landSuitabilityColors: { [key: string]: any } = {
  //   4: { fillColor: "#10a063", color: "#fff" },
  //   3: { fillColor: "#ffcd42", color: "#fff" },
  //   2: { fillColor: "#e99b5C", color: "#fff" },
  //   1: { fillColor: "#ce5050", color: "#fff" },
  //   null: { fillColor: "#6f6f6f", color: "#fff" },
  // };

  function landColor(index: any) {
    if (index == 4) {
      return { fillColor: "#10a063", color: "#fff" };
    } else if (index == 3) {
      return { fillColor: "#ffcd42", color: "#fff" };
    } else if (index == 2) {
      return { fillColor: "#e99b5C", color: "#fff" };
    } else if (index == 1) {
      return { fillColor: "#ce5050", color: "#fff" };
    } else return { fillColor: "#6f6f6f", color: "#fff" };
  }

  return (
    <div>
      <MapContainer
        center={[-2.071844, 120.225729]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "1000px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Peta Kesesuaian Lahan">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const landSuitabilityClass =
                    dataLand?.data[index]?.observations[0]
                      ?.landSuitabilityClass;
                  console.log(
                    dataLand?.data[index]?.observations[0]?.landSuitabilityClass
                  );
                  const { fillColor, color } = landColor(
                    Number(landSuitabilityClass)
                  ) || {
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
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card card-compact w-80">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          {/*
            <LayersControl.Overlay name="Kelas S1 - Sangat Sesuai">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const landSuitabilityClass =
                    dataLand?.data[index]?.observations[0]
                      ?.landSuitabilityClass;

                  const { fillColor, color } = landColor(4) || {
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
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kelas S2 - Cukup Sesuai">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const landSuitabilityClass =
                    dataLand?.data[index]?.observations[0]
                      ?.landSuitabilityClass;

                  const { fillColor, color } = landColor(3) || {
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
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kelas S3 - Sesuai Marginal">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const landSuitabilityClass =
                    dataLand?.data[index]?.observations[0]
                      ?.landSuitabilityClass;

                  const { fillColor, color } = landColor(2) || {
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
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kelas N - Tidak Sesuai">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const landSuitabilityClass =
                    dataLand?.data[index]?.observations[0]
                      ?.landSuitabilityClass;

                  const { fillColor, color } = landColor(1) || {
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
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          */}
          <LayersControl.Overlay name="Saturasi Basa">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const dataMap =
                    dataLand?.data[index]?.observations[0]?.growthVariables[0]
                      .class;

                  const { fillColor, color } = landColor(Number(dataMap)) || {
                    fillColor: "#000000",
                    color: "#000000",
                  };

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kedalaman Mineral Tanah">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const dataMap =
                    dataLand?.data[index]?.observations[0]?.growthVariables[1]
                      .class;

                  const { fillColor, color } = landColor(Number(dataMap)) || {
                    fillColor: "#000000",
                    color: "#000000",
                  };

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Tekstur Tanah">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const dataMap =
                    dataLand?.data[index]?.observations[0]?.growthVariables[2]
                      .class;

                  const { fillColor, color } = landColor(Number(dataMap)) || {
                    fillColor: "#000000",
                    color: "#000000",
                  };

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kemasaman Tanah">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const dataMap =
                    dataLand?.data[index]?.observations[0]?.growthVariables[3]
                      .class;

                  const { fillColor, color } = landColor(Number(dataMap)) || {
                    fillColor: "#000000",
                    color: "#000000",
                  };

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Drainase">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const dataMap =
                    dataLand?.data[index]?.observations[0]?.growthVariables[4]
                      .class;

                  const { fillColor, color } = landColor(Number(dataMap)) || {
                    fillColor: "#000000",
                    color: "#000000",
                  };

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kapasitas Tukar Kation">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const dataMap =
                    dataLand?.data[index]?.observations[0]?.growthVariables[5]
                      .class;

                  const { fillColor, color } = landColor(Number(dataMap)) || {
                    fillColor: "#000000",
                    color: "#000000",
                  };

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Relief">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const dataMap =
                    dataLand?.data[index]?.observations[0]?.growthVariables[6]
                      .class;

                  const { fillColor, color } = landColor(Number(dataMap)) || {
                    fillColor: "#000000",
                    color: "#000000",
                  };

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Elevasi">
            <LayerGroup>
              {isFetchedLand &&
                coordinates.map((polygonCoords: any, index: any) => {
                  const dataMap =
                    dataLand?.data[index]?.observations[0]?.growthVariables[7]
                      .class;

                  const { fillColor, color } = landColor(Number(dataMap)) || {
                    fillColor: "#000000",
                    color: "#000000",
                  };

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className="card w-64">
                          <div className="card-body">
                            <h2 className="card-title">Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[0].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[1].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[2].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[3].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Drainase:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[4].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[5].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Relief:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[6].class
                                    )
                                  )}
                                </span>
                              </p>
                              <p>
                                Elevasi:{" "}
                                <span
                                  className={setBg(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                >
                                  {setTitle(
                                    Number(
                                      dataLand?.data[index]?.observations[0]
                                        .growthVariables[7].class
                                    )
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
