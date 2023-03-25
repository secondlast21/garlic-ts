import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import CustomSelect from "../inputHelper/CustomSelect";
import { getGrowthVariable } from "@/services/growthVariableService";
import { useQuery } from "react-query";
import Image from "next/image";
import logoIpb from "../../../public/logo_ipb.png";
import { postService } from "@/services/penilaianService";
import { useMutation } from "react-query";
import { setTitle, setResultTitle, setResultFactor } from "@/utils/utils";

export default function PenilaianKesesuaianLahanForm() {
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
  const [province, setProvince] = useState([
    {
      name: "empty",
    },
  ]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [kabupaten, setKabupaten] = useState([{ name: "empty" }]);
  const [kecamatan, setKecamatan] = useState([{ name: "empty" }]);
  const [kelurahan, setKelurahan] = useState([
    {
      name: "empty",
    },
  ]);
  const [selectedKabupaten, setSelectedKabupaten] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [selectedKelurahan, setSelectedKelurahan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [syaratTumbuh, setSyaratTumbuh] = useState([]);
  const [kesesuaianLahan, setKesesuaianLahan] = useState(undefined);
  const [namaLahan, setNamaLahan] = useState("");

  const { mutate, reset } = useMutation(postService, {
    onSuccess: (data) => {
      console.log(data);
      console.log(data?.data.observations[0].growthVariables);
      setNamaLahan(data?.data.landName);
      setSyaratTumbuh(data?.data.observations[0].growthVariables);
      setKesesuaianLahan(data?.data.observations[0].landSuitabilityClass);
      console.log(syaratTumbuh);
      console.log(namaLahan);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });
  const { data, isFetched } = useQuery("getGrowthVariable", getGrowthVariable);

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

  useEffect(() => {
    fetchProvince();
  }, []);

  // useEffect(() => {
  //   setData();
  // }, []);

  useEffect(() => {
    fetchKabupaten(selectedProvince);
  }, [selectedProvince]);

  useEffect(() => {
    fetchKecamatan(selectedKabupaten);
  }, [selectedKabupaten]);

  useEffect(() => {
    fetchKelurahan(selectedKecamatan);
  }, [selectedKecamatan]);

  const fetchProvince = async () => {
    const data = await fetch(
      "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
    );
    const json = await data.json();
    setProvince(json.provinsi);
  };

  const fetchKabupaten = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    );
    const json = await data.json();
    setKabupaten(json.kota_kabupaten);
  };

  const fetchKecamatan = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
    );
    const json = await data.json();
    setKecamatan(json.kecamatan);
  };

  const fetchKelurahan = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
    );
    const json = await data.json();
    setKelurahan(json.kelurahan);
  };

  const handleChangeProvince = (e) => {
    formik.setFieldValue("provinsi", e.target.value);
    setSelectedProvince(e.target.value);
  };

  const handleChangeKabupaten = (e) => {
    formik.setFieldValue("kabupaten/kota", e.target.value);
    setSelectedKabupaten(e.target.value);
  };

  const handleChangeKecamatan = (e) => {
    formik.setFieldValue("kecamatan", e.target.value);
    setSelectedKecamatan(e.target.value);
  };

  const handleChangeKelurahan = (e) => {
    formik.setFieldValue("kelurahan/desa", e.target.value);
    setSelectedKelurahan(e.target.value);
  };

  function postData(body) {
    mutate(body);
    setShowModal(true);
  }

  function closeResult() {
    setShowModal(false);
  }

  function dateToMillis(input) {
    var d = new Date(input);
    return d.getTime();
  }

  const formik = useFormik({
    initialValues: {
      landName: "",
      provinceCode: "",
      provinceName: "",
      districtCode: "",
      districtName: "",
      subDistrictCode: "",
      subDistrictName: "",
      urbanVillageCode: "",
      urbanVillageName: "",
      longitude: "",
      latitude: "",
      temperatureId: "",
      rainfallId: "",
      sunshineDurationId: "",
      solarRadiationId: "",
      elevationId: "",
      reliefId: "",
      soilMineralDepthId: "",
      baseSaturationId: "",
      soilAcidityId: "",
      drainageId: "",
      soilTextureId: "",
      cationExchangeCapacityId: "",
      observationDate: "",
    },

    onSubmit: (values) => {
      let empty = "";
      for (const v in values) {
        if (values[v] == "") {
          empty += ` ${v},`;
        }
      }

      console.log(province);

      let result = {
        landName: values.landName,
        provinceCode: String(province.find((d) => d.id == values.provinsi).id),
        provinceName: province.find((d) => d.id == values.provinsi).nama,
        districtCode: String(
          kabupaten.find((d) => d.id == values["kabupaten/kota"]).id
        ),
        districtName: kabupaten.find((d) => d.id == values["kabupaten/kota"])
          .nama,
        subDistrictCode: String(
          kecamatan.find((d) => d.id == values.kecamatan).id
        ),
        subDistrictName: kecamatan.find((d) => d.id == values.kecamatan).nama,
        urbanVillageCode: String(
          kelurahan.find((d) => d.id == values["kelurahan/desa"]).id
        ),
        urbanVillageName: kelurahan.find(
          (d) => d.id == values["kelurahan/desa"]
        ).nama,
        longitude: Number(values.longitude),
        latitude: Number(values.latitude),
        temperatureId: Number(values.temperatureId),
        rainfallId: Number(values.rainfallId),
        sunshineDurationId: Number(values.sunshineDurationId),
        solarRadiationId: 70,
        elevationId: Number(values.elevationId),
        reliefId: Number(values.reliefId),
        soilMineralDepthId: Number(values.soilMineralDepthId),
        baseSaturationId: Number(values.baseSaturationId),
        soilAcidityId: Number(values.soilAcidityId),
        drainageId: Number(values.drainageId),
        soilTextureId: Number(values.soilTextureId),
        cationExchangeCapacityId: Number(values.cationExchangeCapacityId),
        observationDate: dateToMillis(values.observationDate),
      };

      postData(result);

      console.log(values);
      console.log(result);
      console.log(data);
    },
  });

  return (
    <div className="min-h-screen font-display flex bg-accent items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="card w-1/2 bg-base-100 shadow-xl ml-10 mr-5">
        <figure className="px-10 pt-10">
          <Image src={logoIpb} className=" w-36 mx-auto" alt="" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            Masukkan Data Syarat Tumbuh Bawang Putih
          </h2>
          <div className="flex-grow rounded bg-white px-8 py-4 flex items-center justify-center">
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-6 gap-6 my-8 mx-2">
                <div className="mb-col-span-6 sm:col-span-3">
                  <label
                    htmlFor="observationDate"
                    className="m-2 font-bold text-black"
                  >
                    Tanggal
                  </label>
                  <input
                    id="observationDate"
                    name="observationDate"
                    type="date"
                    placeholder=""
                    onChange={(value) => {
                      formik.setFieldValue(
                        "observationDate",
                        value.target.value
                      );
                    }}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
                  />
                </div>
                <div className="mb-col-span-6 sm:col-span-3">
                  <label
                    htmlFor="landName"
                    className="m-2 font-bold text-black"
                  >
                    Nama Lahan
                  </label>
                  <input
                    id="landName"
                    name="landName"
                    type="text"
                    placeholder=""
                    onChange={(value) => {
                      formik.setFieldValue("landName", value.target.value);
                    }}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6 my-8 mx-2">
                <div className="mb-col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Provinsi"
                    className="m-2 font-bold text-black"
                  >
                    Provinsi
                  </label>
                  <select
                    id="country"
                    name="country"
                    onChange={handleChangeProvince}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
                  >
                    <option>-- Pilih Provinsi --</option>
                    {province.map((p) => (
                      <option value={p.id} key={p.id} className="text-black">
                        {p.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Kabupaten"
                    className="m-2 font-bold text-black"
                  >
                    Kabupaten
                  </label>
                  <select
                    id="country"
                    name="country"
                    onChange={handleChangeKabupaten}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
                  >
                    <option>-- Pilih Kabupaten --</option>
                    {kabupaten.map((k) => (
                      <option value={k.id} key={k.id}>
                        {k.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6 my-8 mx-2">
                <div className="mb-col-span-6 sm:col-span-3">
                  <label
                    htmlFor="kecamatan"
                    className="m-2 font-bold text-black"
                  >
                    Kecamatan
                  </label>
                  <select
                    id="kecamatan"
                    name="kecamatan"
                    onChange={handleChangeKecamatan}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
                  >
                    <option>-- Pilih Kecamatan --</option>
                    {kecamatan.map((p) => (
                      <option value={p.id} key={p.id} className="text-black">
                        {p.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-col-span-6 sm:col-span-3">
                  <label
                    htmlFor="kelurahan"
                    className="m-2 font-bold text-black"
                  >
                    Kelurahan/Desa
                  </label>
                  <select
                    id="kelurahan"
                    name="kelurahan"
                    onChange={handleChangeKelurahan}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
                  >
                    <option>-- Pilih Kelurahan / Desa --</option>
                    {kelurahan.map((k) => (
                      <option value={k.id} key={k.id}>
                        {k.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-col-span-6 sm:col-span-3">
                  <label
                    htmlFor="latitude"
                    className="m-2 font-bold text-black"
                  >
                    Latitude
                  </label>
                  <input
                    id="latitude"
                    name="latitude"
                    type="text"
                    placeholder=""
                    onChange={(value) => {
                      formik.setFieldValue("latitude", value.target.value);
                    }}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
                  />
                </div>
                <div className="mb-col-span-6 sm:col-span-3">
                  <label
                    htmlFor="longitude"
                    className="m-2 font-bold text-black"
                  >
                    Longitude
                  </label>
                  <input
                    id="longitude"
                    name="longitude"
                    type="text"
                    placeholder=""
                    onChange={(value) => {
                      formik.setFieldValue("longitude", value.target.value);
                    }}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
                  />
                </div>
              </div>
              <div className="text-justify">
                <div className="col-span-full flex space-x-4 text-lg mt-8 text-black">
                  <b>
                    Faktor yang tidak dapat dikendalikan dan tidak dapat
                    dikoreksi
                  </b>
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="cuaca"
                    className="block text-base font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Cuaca</b>
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="temperatur"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Temperatur</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("temperatureId", value.value)
                    }
                    value={formik.values.temperatur}
                    options={temperaturOptions}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="curahHujan"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Curah Hujan</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("rainfallId", value.value)
                    }
                    value={formik.values.curahHujan}
                    options={curahHujanOptions}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="lamaPenyinaran"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Lama Penyinaran</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("sunshineDurationId", value.value)
                    }
                    value={formik.values.lamaPenyinaran}
                    options={lamaPenyinaranOptions}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 mt-8">
                  <label
                    htmlFor="faktorRelief"
                    className="block text-base font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Faktor Relief</b>
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="elevationId"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Elevasi</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("elevationId", value.value)
                    }
                    value={formik.values.elevasi}
                    options={elevasiOptions}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="reliefId"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Relief</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("reliefId", value.value)
                    }
                    value={formik.values.relief}
                    options={reliefOptions}
                  />
                </div>
              </div>
              <div className="text-justify">
                <div className="col-span-full flex space-x-4 text-lg mt-8 text-black">
                  <b>Faktor yang dapat dikoreksi</b>
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="kedalamanMineralTanah"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Kedalaman Mineral Tanah</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("soilMineralDepthId", value.value)
                    }
                    value={formik.values.kedalamanMineralTanah}
                    options={kedalamanMineralTanahOptions}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="kejenuhanBasa"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Kejenuhan Basa</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("baseSaturationId", value.value)
                    }
                    value={formik.values.kejenuhanBasa}
                    options={kejenuhanBasaOptions}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="teksturTanah"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Kemasaman Tanah</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("soilAcidityId", value.value)
                    }
                    value={formik.values.kemasamanTanah}
                    options={kemasamanTanahOptions}
                  />
                </div>
              </div>
              <div className="text-justify">
                <div className="col-span-full flex space-x-4 text-lg mt-8 text-black">
                  <b>Faktor yang dapat dikendalikan</b>
                </div>
                <div className="col-span-6 sm:col-span-3 mb-8">
                  <label
                    htmlFor="drainase"
                    className="block text-base font-medium text-gray-700 space-x-4"
                  >
                    <b>Drainase</b>
                  </label>

                  <CustomSelect
                    onChange={(value) => {
                      formik.setFieldValue("drainageId", value.value);
                    }}
                    value={formik.values.drainase}
                    options={drainaseOptions}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="drainase"
                    className="block text-base font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Media Perakaran</b>
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="teksturTanah"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Tekstur Tanah</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("soilTextureId", value.value)
                    }
                    value={formik.values.teksturTanah}
                    options={teksturTanahOptions}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 mt-8">
                  <label className="block text-base font-medium text-gray-700 space-x-4 my-2">
                    <b>Retensi Hara</b>
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="kapasitasTukarKation"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Kapasitas Tukar Kation </b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue(
                        "cationExchangeCapacityId",
                        value.value
                      )
                    }
                    value={formik.values.kapasitasTukarKation}
                    options={kapasitasTukarKationOptions}
                  />
                </div>
              </div>
              <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <button className="btn btn-accent py-4 mt-8" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="card w-1/2 bg-base-100 shadow-xl ml-5 mr-10 p-5">
            <button
              className="btn btn-error btn-circle text-white"
              onClick={closeResult}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className={setResultTitle(Number(kesesuaianLahan?.land))}>
              Hasil Penilaian Kesesuaian Lahan : {namaLahan} -{" "}
              {setTitle(kesesuaianLahan?.land)}
            </h2>
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              <div
                className={setResultFactor(
                  Number(kesesuaianLahan?.uncorrectableAndUncontrollableFactor)
                )}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Faktor yang Tidak Dapat Dikendalikan dan Tidak Dapat
                    Dikoreksi -{" "}
                    {setTitle(
                      kesesuaianLahan?.uncorrectableAndUncontrollableFactor
                    )}
                  </h2>
                </div>
              </div>
              <div
                className={setResultFactor(
                  Number(kesesuaianLahan?.correctableFactor)
                )}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Faktor yang Dapat Dikoreksi -{" "}
                    {setTitle(kesesuaianLahan?.correctableFactor)}
                  </h2>
                </div>
              </div>
              <div
                className={setResultFactor(
                  Number(kesesuaianLahan?.controllableFactor)
                )}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Faktor yang Dapat Dikendalikan -{" "}
                    {setTitle(kesesuaianLahan?.controllableFactor)}
                  </h2>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[0]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Kedalaman Mineral Tanah -{" "}
                    {setTitle(syaratTumbuh?.[0]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[0]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[1]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Drainase - {setTitle(syaratTumbuh?.[1]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[1]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[2]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Tekstur Tanah - {setTitle(syaratTumbuh?.[2]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[2]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[3]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Kemasaman Tanah - {setTitle(syaratTumbuh?.[3]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[3]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[4]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Kapasitas Tukar Kation -{" "}
                    {setTitle(syaratTumbuh?.[4]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[4]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[5]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Kejenuhan Basa - {setTitle(syaratTumbuh?.[5]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[5]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[6]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Relief - {setTitle(syaratTumbuh?.[6]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[6]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[7]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Temperatur - {setTitle(syaratTumbuh?.[7]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[7]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[8]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Curah Hujan - {setTitle(syaratTumbuh?.[8]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[8]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[9]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Lama Penyinaran - {setTitle(syaratTumbuh?.[9]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[9]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
              <div
                className={setResultFactor(Number(syaratTumbuh?.[11]?.class))}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Elevasi - {setTitle(syaratTumbuh?.[11]?.class)}
                  </h2>
                  <p>
                    Rekomendasi :{" "}
                    {syaratTumbuh?.[11]?.recommendation ??
                      "Tidak ada rekomendasi"}
                  </p>
                </div>
              </div>
            </div>
            <div className="card-actions justify-end mt-5">
              <button
                className="btn btn-error text-white gap-2"
                onClick={closeResult}
              >
                Tutup
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
