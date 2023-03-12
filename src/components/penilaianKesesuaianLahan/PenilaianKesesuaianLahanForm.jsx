import Navbar from "../navbar/Navbar";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage, useFormik } from "formik";
import CustomSelect from "../inputHelper/CustomSelect";
import Select from "react-select";
import * as Yup from "yup";
import { getGrowthVariable } from "@/services/growthVariableService";
import { useQuery } from "react-query";
import { BaseGrowthResponse } from "@/services/growthVariableService";
import Image from "next/image";
import Link from "next/link";
import logoIpb from "../../../public/logo_ipb.png";

const styles = {
  label: "block text-black text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-200 text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
  errorMsg: "text-red-500 text-sm",
};

export default function PenilaianKesesuaianLahanForm() {
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
  const [syaratTumbuh, setSyaratTumbuh] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    fetch(
      "https://garlic-backend.herokuapp.com/api/v1/inputPengguna",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSyaratTumbuh(data);
        setShowModal(true);
      })
      .catch((error) => {
        setTimeout(() => {
          alert(error);
        }, 1000);
      });
  }

  const getColor = (nilai) => {
    if (1 <= nilai && nilai <= 1.5) {
      return "bg-red-600";
    } else if (1.5 < nilai && nilai <= 2.5) {
      return "bg-yellow-600";
    } else if (2.5 < nilai && nilai <= 3.5) {
      return "bg-yellow-300";
    } else if (3.5 < nilai && nilai <= 4) {
      return "bg-green-500";
    }
    return "bg-red-600";
  };

  const getKelas = (nilai) => {
    if (1 <= nilai && nilai <= 1.5) {
      return "N";
    } else if (1.5 < nilai && nilai <= 2.5) {
      return "S3";
    } else if (2.5 < nilai && nilai <= 3.5) {
      return "S2";
    } else if (3.5 < nilai && nilai <= 4) {
      return "S1";
    }
    return "N";
  };

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

      let result = {
        provinceName: province.find((d) => d.id == values.provinsi).id,
        districtName: kabupaten.find((d) => d.id == values["kabupaten/kota"])
          .nama,
        subDistrictName: kecamatan.find((d) => d.id == values.kecamatan).nama,
        urbanVillageName: kelurahan.find(
          (d) => d.id == values["kelurahan/desa"]
        ).nama,
        drainageId: values.drainageId,
        //mediaPerakaran: values.mediaPerakaran,
        soilTextureId: values.soilTextureId,
        //retensi: values.retensi,
        cationExchangeCapacityId: values.cationExchangeCapacityId,
        soilAcidityId: values.soilAcidityId,
        soilMineralDepthId: values.soilMineralDepthId,
        baseSaturationId: values.baseSaturationId,
        // cuaca: values.cuaca,
        temperatureId: values.temperatureId,
        rainfallId: values.rainfallId,
        //radiasiPenyinaran: values.radiasiPenyinaran,
        // faktorRelief: values.faktorRelief,
        elevationId: values.elevationId,
        reliefId: values.reliefId,
        sunshineDurationId: values.sunshineDurationId,
        solarRadiationId: values.solarRadiationId,
        latitude: values.latitude,
        longitude: values.longitude,
      };

      if (empty === "") {
        postData(result);
      } else {
        setTimeout(() => {
          alert(`Kelas ${empty} Tidak Boleh Kosong`);
        }, 1000);
      }

      console.log(result);
    },
  });

  return (
    <div className="min-h-screen font-display flex bg-accent items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="card w-fit bg-base-100 shadow-xl">
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
                    type="latitude"
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
                    type="longitude"
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
                <div className="col-span-6 sm:col-span-3 my-2">
                  <label
                    htmlFor="radiasiPenyinaran"
                    className="block text-sm font-medium text-gray-700 space-x-4 my-2"
                  >
                    <b>Radiasi Penyinaran</b>
                  </label>
                  <CustomSelect
                    onChange={(value) =>
                      formik.setFieldValue("solarRadiationId", value.value)
                    }
                    value={formik.values.radiasiPenyinaran}
                    options={radiasiPenyinaranOptions}
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
                    htmlFor="elevasi"
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
                    htmlFor="relief"
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
                    className="text-black block text-base font-medium text-gray-700 space-x-4"
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
    </div>
  );
}
