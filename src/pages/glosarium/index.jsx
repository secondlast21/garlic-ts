import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";
import { getGrowthVariable } from "@/services/growthVariableService";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import RequireAuth from "@/components/Auth";
import { setTitle } from "@/utils/utils";

export default function Glosarium() {
  const { data, isFetched } = useQuery("getGrowthVariable", getGrowthVariable);

  const [drainaseOptions, setDrainaseOptions] = useState([]);
  const [teksturTanahOptions, setTeksturTanahOptions] = useState([]);
  const [kapasitasTukarKationOptions, setKapasitasTukarKationOptions] =
    useState([]);
  const [kedalamanMineralTanahOptions, setKedalamanMineralTanahOptions] =
    useState([]);
  const [kejenuhanBasaOptions, setKejenuhanBasaOptions] = useState([]);
  const [kemasamanTanahOptions, setKemasamanTanahOptions] = useState([]);
  const [reliefOptions, setReliefOptions] = useState([]);
  const [curahHujanOptions, setCurahHujanOptions] = useState([]);
  const [lamaPenyinaranOptions, setLamaPenyinaranOptions] = useState([]);
  const [radiasiPenyinaranOptions, setRadiasiPenyinaranOptions] = useState([]);
  const [elevasiOptions, setElevasiOptions] = useState([]);
  const [temperaturOptions, setTemperaturOptions] = useState([]);

  if (isFetched) {
    console.log(data);
  }

  useEffect(() => {
    const drainage = data?.data.filter(function (values) {
      return values.variable === "drainage";
    });
    console.log(drainage);
    const drainageList = [];
    drainage &&
      drainage.map((d) => {
        drainageList.push({
          label: d.type,
          value: d.id,
          kelas: d.class,
        });
      });
    setDrainaseOptions(drainageList);
    const soil_mineral_depth = data?.data.filter(function (values) {
      return values.variable === "soil_mineral_depth";
    });
    const soil_mineral_depthList = [];
    soil_mineral_depth &&
      soil_mineral_depth.map((d) => {
        soil_mineral_depthList.push({
          label: ` (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${d.upperLimitInterval == null ? "" : d.upperLimitInterval} cm)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setKedalamanMineralTanahOptions(soil_mineral_depthList);
    const soil_texture = data?.data.filter(function (values) {
      return values.variable === "soil_texture";
    });
    const soil_textureList = [];
    soil_texture &&
      soil_texture.map((d) => {
        soil_textureList.push({
          label: d.type,
          value: d.id,
          kelas: d.class,
        });
      });
    setTeksturTanahOptions(soil_textureList);
    const soil_acidity = data?.data.filter(function (values) {
      return values.variable === "soil_acidity";
    });
    const soil_acidityList = [];
    soil_acidity &&
      soil_acidity.map((d) => {
        soil_acidityList.push({
          label: ` (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${d.upperLimitInterval == null ? "" : d.upperLimitInterval} %)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setKemasamanTanahOptions(soil_acidityList);
    const cation_exchange_capacity = data?.data.filter(function (values) {
      return values.variable === "cation_exchange_capacity";
    });
    const cation_exchange_capacityList = [];
    cation_exchange_capacity &&
      cation_exchange_capacity.map((d) => {
        cation_exchange_capacityList.push({
          label: `${d.type} (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${d.upperLimitInterval == null ? "" : d.upperLimitInterval} cmol)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setKapasitasTukarKationOptions(cation_exchange_capacityList);
    const base_saturation = data?.data.filter(function (values) {
      return values.variable === "base_saturation";
    });
    const base_saturationList = [];
    base_saturation &&
      base_saturation.map((d) => {
        base_saturationList.push({
          label: ` (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${d.upperLimitInterval == null ? "" : d.upperLimitInterval} %)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setKejenuhanBasaOptions(base_saturationList);
    const relief = data?.data.filter(function (values) {
      return values.variable === "relief";
    });
    const reliefList = [];
    relief &&
      relief.map((d) => {
        reliefList.push({
          label: ` (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${d.upperLimitInterval == null ? "" : d.upperLimitInterval} %)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setReliefOptions(reliefList);
    const temperature = data?.data.filter(function (values) {
      return values.variable === "temperature";
    });
    const temperatureList = [];
    temperature &&
      temperature.map((d) => {
        temperatureList.push({
          label: ` (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${
            d.upperLimitInterval == null ? "" : d.upperLimitInterval
          } c/bulan)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setTemperaturOptions(temperatureList);
    const sunshine_duration = data?.data.filter(function (values) {
      return values.variable === "sunshine_duration";
    });
    console.log(sunshine_duration);
    const sunshine_durationList = [];
    sunshine_duration &&
      sunshine_duration.map((d) => {
        sunshine_durationList.push({
          label: ` (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${
            d.upperLimitInterval == null ? "" : d.upperLimitInterval
          } jam/hari)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setLamaPenyinaranOptions(sunshine_durationList);
    const elevation = data?.data.filter(function (values) {
      return values.variable === "elevation";
    });
    console.log(elevation);
    console.log(data?.data);
    const elevationList = [];
    elevation &&
      elevation.map((d) => {
        elevationList.push({
          label: ` (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${
            d.upperLimitInterval == null ? "" : d.upperLimitInterval
          } mm/bulan)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setElevasiOptions(elevationList);
    const rainfall = data?.data.filter(function (values) {
      return values.variable === "rainfall";
    });
    const rainfallList = [];
    rainfall &&
      rainfall.map((d) => {
        rainfallList.push({
          label: ` (${
            d.lowerLimitInterval == null
              ? " < "
              : d.upperLimitInterval == null
              ? ` > ${d.lowerLimitInterval}`
              : d.lowerLimitInterval
          }  ${
            d.lowerLimitInterval != null && d.upperLimitInterval != null
              ? " - "
              : ""
          }  ${
            d.upperLimitInterval == null ? "" : d.upperLimitInterval
          } mm/bulan)`,
          value: d.id,
          kelas: d.class,
        });
      });
    setCurahHujanOptions(rainfallList);
    const solar_radiation = data?.data.filter(function (values) {
      return values.variable === "solar_radiation";
    });
    const solar_radiationList = [];
    solar_radiation &&
      solar_radiation.map((d) => {
        solar_radiationList.push({
          label: d.type,
          value: d.id,
          kelas: d.class,
        });
      });
    setRadiasiPenyinaranOptions(solar_radiationList);
  }, [isFetched]);

  console.log(drainaseOptions);
  console.log(teksturTanahOptions);
  console.log(kapasitasTukarKationOptions);
  console.log(kedalamanMineralTanahOptions);
  console.log(kejenuhanBasaOptions);
  console.log(kemasamanTanahOptions);
  console.log(reliefOptions);
  console.log(curahHujanOptions);
  console.log(lamaPenyinaranOptions);
  console.log(radiasiPenyinaranOptions);
  console.log(elevasiOptions);
  console.log(temperaturOptions);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <RequireAuth>
      <>
        <Head>
          <title>INA Agro-GARLIC</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div className="m-32 grid grid-cols-3 gap-4 place-items-strecth">
          <div>
            <h2 className="text-xl font-black">Drainase</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {drainaseOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Tekstur Tanah</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {teksturTanahOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Kapasitas Tukar Kation</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {kapasitasTukarKationOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Kedalaman Mineral Tanah</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {kedalamanMineralTanahOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Kejenuhan Basa</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {kejenuhanBasaOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Kemasaman Tanah</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {kemasamanTanahOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Relief</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {reliefOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Curah Hujan</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {curahHujanOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Lama Penyinaran</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {lamaPenyinaranOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Elevasi</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {elevasiOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-xl font-black">Temperatur</h2>
            <table className="table-fixed border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Label
                  </th>
                  <th className="px-20 py-3 border-b border-black bg-accent font-black">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {temperaturOptions.map(({ label, kelas }, idx) => (
                  <tr key={idx}>
                    <td className="border-b border-t border-black px-4">
                      {capitalizeFirstLetter(label)}
                    </td>
                    <td className="border-b border-t border-black px-4">
                      {setTitle(kelas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center">
          *Informasi diatas bersumber dari Balai Besar Sumberdaya Lahan
          Pertanian
        </p>
        <Footer />
      </>
    </RequireAuth>
  );
}
