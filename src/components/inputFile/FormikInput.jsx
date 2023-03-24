import React, { useEffect, useState } from "react";
import { Formik, Form, useFormik } from "formik";
import { postFile } from "@/services/inputService";
import { useMutation } from "react-query";
import Link from "next/link";
import Swal from "sweetalert2";

const initialValues = {
  provinceName: "",
  provinceCode: "",
  districtName: "",
  districtCode: "",
  shpFile: "",
  xlsxFile: "",
  shxFile: "",
  dbfFile: "",
  prjFile: "",
};

const FormikInput = () => {
  const { mutate, reset } = useMutation(postFile, {
    onSuccess: (data) => {
      Swal.fire({
        title: "Berhasil!",
        text: "File anda berhasil diupload!",
        icon: "success",
        confirmButtonColor: "#10a063",
        confirmButtonText: "OK",
      });
      console.log(data?.message);
      reset();
    },
    onError: (error) => {
      setErrorMessage(error?.message);
      Swal.fire({
        title: "Gagal!",
        text: "File anda gagal diupload!",
        icon: "error",
        confirmButtonColor: "#ce5050",
        confirmButtonText: "OK",
      });
      console.log(data?.message);
      reset();
    },
  });

  const onSubmitFile = (values) => {
    const body = new FormData();

    body.append("provinceName", values.provinceName);
    body.append("provinceCode", values.provinceCode);
    body.append("districtName", values.districtName);
    body.append("districtCode", values.districtCode);
    body.append("shpFile", values.shpFile);
    body.append("xlsxFile", values.xlsxFile);
    body.append("shxFile", values.shxFile);
    body.append("dbfFile", values.dbfFile);
    body.append("prjFile", values.prjFile);

    console.log(values.shpFile);
    console.log(values.xlsxFile);
    console.log(values.shxFile);
    console.log(values.dbfFile);
    console.log(values.prjFile);

    mutate(body);
    console.log(values);
  };

  return (
    <>
      <div className="m-16">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={onSubmitFile}
          component={UploadFile}
        />
      </div>
    </>
  );
};

function UploadFile({ values, setFieldValue }) {
  const [province, setProvince] = useState([
    {
      name: "empty",
    },
  ]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [kabupaten, setKabupaten] = useState([{ name: "empty" }]);
  const [selectedKabupaten, setSelectedKabupaten] = useState(null);
  const [provinceName, setProvinceName] = useState(null);
  const [districtName, setDistrictName] = useState(null);
  const fileInput1 = React.createRef();
  const fileInput2 = React.createRef();
  const fileInput3 = React.createRef();
  const fileInput4 = React.createRef();
  const fileInput5 = React.createRef();

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {
    fetchKabupaten(selectedProvince);
  }, [selectedProvince]);

  const fetchProvince = async () => {
    const data = await fetch(
      "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
    );
    const json = await data.json();
    setProvince(json.provinsi);
    console.log("provinsi", json);
  };

  const fetchKabupaten = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    );
    const json = await data.json();
    setKabupaten(json.kota_kabupaten);
    console.log("kabupaten", json);
  };

  const detailProvince = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/provinsi/${id}`
    );
    const json = await data.json();
    setProvinceName(json.nama);
    setFieldValue("provinceName", json.nama);
    console.log(json.nama);
  };

  const detailDistrict = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota/${id}`
    );
    const json = await data.json();
    setDistrictName(json.nama);
    setFieldValue("districtName", json.nama);
    console.log(json.nama);
  };

  const handleChangeProvince = (e) => {
    setFieldValue("provinceCode", e.target.value);
    detailProvince(e.target.value);
    setSelectedProvince(e.target.value);
  };

  const handleChangeKabupaten = (e) => {
    setFieldValue("districtCode", e.target.value);
    detailDistrict(e.target.value);
    setSelectedKabupaten(e.target.value);
  };

  return (
    <div className="mb-8 text-black bg-white p-20 rounded-xl">
      <h1 className="text-4xl">Upload File SPT</h1>
      <Form>
        <div className="grid grid-cols-6 gap-6 my-8 mx-2">
          <div className="mb-col-span-6 sm:col-span-3">
            <label htmlFor="provinceCode" className="m-2 font-bold text-black">
              Provinsi
            </label>
            <select
              id="provinceCode"
              name="provinceCode"
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
            <label htmlFor="districtCode" className="m-2 font-bold text-black">
              Kabupaten
            </label>
            <select
              id="districtCode"
              name="districtCode"
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
        <div className="m-2 font-bold">File Shp</div>
        <div className="m-2 bg-primary-white rounded-lg border-black border flex mb-8">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              setFieldValue("shpFile", event.currentTarget.files[0]);
              console.log(event.currentTarget.files[0]);
            }}
            ref={fileInput1}
          />

          <button
            className="mr-4 bg-s1 p-2 rounded-l-lg text-white"
            type="button"
            onClick={() => fileInput1.current.click()}
          >
            Choose file
          </button>

          <small className="text-base my-auto">
            {values.shpFile ? values.shpFile.name || "Error" : "No file chosen"}
          </small>
          <div className="flex-grow"></div>
        </div>

        <div className="m-2 font-bold">File Shx</div>
        <div className="m-2 bg-primary-white rounded-lg border-black border flex mb-8">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              setFieldValue("shxFile", event.currentTarget.files[0]);
            }}
            ref={fileInput2}
          />

          <button
            className="mr-4 bg-s1 p-2 rounded-l-lg text-white"
            type="button"
            onClick={() => fileInput2.current.click()}
          >
            Choose file
          </button>

          <small className="text-base my-auto">
            {values.shxFile ? values.shxFile.name || "Error" : "No file chosen"}
          </small>
          <div className="flex-grow"></div>
        </div>

        <div className="m-2 font-bold">File Dbf</div>
        <div className="m-2 bg-primary-white rounded-lg border-black border flex mb-8">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              setFieldValue("dbfFile", event.currentTarget.files[0]);
            }}
            ref={fileInput3}
          />

          <button
            className="mr-4 bg-s1 p-2 rounded-l-lg text-white"
            type="button"
            onClick={() => fileInput3.current.click()}
          >
            Choose file
          </button>

          <small className="text-base my-auto">
            {values.dbfFile ? values.dbfFile.name || "Error" : "No file chosen"}
          </small>
          <div className="flex-grow"></div>
        </div>

        <div className="m-2 font-bold">File Xlsx</div>
        <div className="m-2 bg-primary-white rounded-lg border-black border flex mb-8">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              setFieldValue("xlsxFile", event.currentTarget.files[0]);
            }}
            ref={fileInput4}
          />
          <button
            className="mr-4 bg-s1 p-2 rounded-l-lg text-white"
            type="button"
            onClick={() => fileInput4.current.click()}
          >
            Choose file
          </button>

          <small className="text-base my-auto">
            {values.xlsxFile
              ? values.xlsxFile.name || "Error"
              : "No file chosen"}
          </small>
          <div className="flex-grow"></div>
        </div>

        <div className="m-2 font-bold">File Prj</div>
        <div className="m-2 bg-primary-white rounded-lg border-black border flex mb-8">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              setFieldValue("prjFile", event.currentTarget.files[0]);
            }}
            ref={fileInput5}
          />

          <button
            className="mr-4 bg-s1 p-2 rounded-l-lg text-white"
            type="button"
            onClick={() => fileInput5.current.click()}
          >
            Choose file
          </button>

          <small className="text-base my-auto">
            {values.prjFile ? values.prjFile.name || "Error" : "No file chosen"}
          </small>
          <div className="flex-grow"></div>
        </div>

        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <button
            type="submit"
            className="w-1/4 mx-3 mt-6 justify-center place-items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-s1 "
          >
            Upload
          </button>
          <Link
            className="w-1/4 mx-3 mt-6 justify-center place-items-center py-2 px-4 border-s1 border-2 shadow-sm text-sm font-medium rounded-md text-s1 bg-white"
            href="/Template_File_SPT.xlsx"
          >
            Download Template File Xlsx
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default FormikInput;
