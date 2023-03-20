import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import * as L from "leaflet";
import {
  BaseUserAreaLocation,
  getUserAreaLocation,
} from "@/services/mapUserService";
import { useQuery } from "react-query";
import { setBg, setTitle } from "@/utils/utils";

export default function Index() {
  const { data, isFetched } = useQuery<BaseUserAreaLocation>(
    "getUserAreaLocation",
    getUserAreaLocation
  );

  if (isFetched) {
    console.log(data);

    data?.data.map((landLocation) => {
      console.log(landLocation);
    });
  }

  var s1Icon = L.icon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|10a063&chf=a,s,ee00FFFF",
  });

  var s2Icon = L.icon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffcd42&chf=a,s,ee00FFFF",
  });

  var s3Icon = L.icon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e99b5C&chf=a,s,ee00FFFF",
  });

  var nIcon = L.icon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ce5050&chf=a,s,ee00FFFF",
  });

  var BLIcon = L.icon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|6f6f6f&chf=a,s,ee00FFFF",
  });

  function setIcon(input: Number) {
    if (input <= 4 && input > 3.5) {
      return s1Icon;
    } else if (input <= 3.5 && input > 2.5) {
      return s2Icon;
    } else if (input <= 2.5 && input > 1.5) {
      return s3Icon;
    } else if (input <= 1.5 && input > 1) {
      return nIcon;
    } else return BLIcon;
  }

  return (
    <MapContainer
      center={[-2.071844, 120.225729]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "1000px", width: "100%" }}
      className="z-0"
    >
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isFetched &&
          data?.data.map((landLocation, idx) => {
            console.log(landLocation);
            let lat = landLocation.pointLocation.latitude;
            let lng = landLocation.pointLocation.longitude;
            return (
              <Marker
                position={[Number(lat), Number(lng)]}
                key={idx}
                icon={setIcon(
                  Number(landLocation.observations[0].landSuitabilityClass.land)
                )}
              >
                <Popup>
                  <div className="card w-64">
                    <div className="card-body">
                      <h2 className="card-title">{landLocation.landName}</h2>
                      <div>
                        <p>
                          Kelas:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0]
                                  .landSuitabilityClass.land
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0]
                                  .landSuitabilityClass.land
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Drainase:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[0]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[0]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Saturasi Basa:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[1]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[1]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Kapasitas Tukar Kation:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[2]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[2]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Kemasaman Tanah:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[3]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[3]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Kedalaman Mineral Tanah:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[4]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[4]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Tekstur Tanah:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[5]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[5]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Elevasi:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[6]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[6]
                                  .class
                              )
                            )}{" "}
                            {Number(
                              landLocation.observations[0].growthVariables[6]
                                .class
                            )}
                          </span>
                        </p>
                        <p>
                          Radiasi Penyinaran:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[7]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[7]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Lama Penyinaran:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[8]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[8]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Curah Hujan:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[9]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[9]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Temperatur:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[10]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[10]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                        <p>
                          Relief:{" "}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].growthVariables[11]
                                  .class
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].growthVariables[11]
                                  .class
                              )
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </>
    </MapContainer>
  );
}
