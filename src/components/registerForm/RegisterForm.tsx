import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import logoIpb from "../../../public/logo_ipb.png"
import Image from "next/image";
import { useMutation } from "react-query";
import { useState } from "react";
import { TLogin, login } from "@/services/authService";
import { TRegister, register } from "@/services/authService";
import { setTokenInLocalStorage } from "@/utils/tokenManager";
import { useRouter } from "next/router";
import Link from "next/link";

const styles = {
    label: "block text-black text-sm font-bold pt-2 pb-1",
    field:
      "bg-gray-200 text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
    errorMsg: "text-red-500 text-sm",
};

export default function RegisterForm() {
    const [errorMessage, setErrorMessage] = useState('')
    const router= useRouter()
    const { mutate, reset } = useMutation(register, {
        onSuccess: (data) => {
            const id = data?.data.id
            const name = data?.data.name
            const email = data?.data.email
            const phone = data?.data.phone
            const profession = data?.data.profession
            const need = data?.data.need
            const activeUntil = data?.data.activeUntil
            const emailVerifiedAt = data?.data.emailVerifiedAt
            const isNeedExtend = data?.data.isNeedExtend
            const createdAt = data?.data.createdAt
            const updatedAt = data?.data.updatedAt
            const institutionId = data?.data.institution.id
            const institutionName = data?.data.institution.name
            const institutionAddress = data?.data.institution.address
            const institutionIsActive = data?.data.institution.isActive
            const institutionCreatedAt = data?.data.institution.createdAt
            const institutionUpdatedAt = data?.data.institution.updatedAt
            router.push('/login')
        },
        onError: (error: any) => {
            setErrorMessage(error?.message)
            alert(errorMessage)
        },
    })

    const handleSubmit = (data: TRegister) => {
        console.log(data)
        mutate(data)
    }
    
    const registerSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email().required("Required"),
        password: Yup.string().required("Required").min(8, "Too Short!"),
        phone: Yup.string().required("Required"),
        profession: Yup.string().required("Required"),
        need: Yup.string().required("Required"),
        institutionName: Yup.string().required("Required"),
        institutionAddress: Yup.string().required("Required"),
    });

    return (
        <div className="min-h-screen font-display flex bg-accent items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Image
                        src={logoIpb}
                        className=" w-36 right-0 mx-auto"
                        alt=""
                    />
                    <h3 className="mt-6 text-center text-3xl font-bold text-black">Buat Akun INA-Agro Garlic</h3>
                </div>
                <div className="flex-grow rounded bg-white p-8 flex items-center justify-center">
                    <Formik 
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            phone: "",
                            profession: "",
                            need: "",
                            institutionId: "",
                            institutionName: "",
                            institutionAddress: ""

                        }}
                        validationSchema={registerSchema}
                        onSubmit={(values: TRegister) => {
                            handleSubmit(values)
                            console.log(values)
                        }}
                    >
                        <Form>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-bold">Nama Lengkap</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="name"
                                    name="name"
                                    type="name"
                                    placeholder=""
                                />
                                <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="name"
                                />
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder=""
                                />
                                <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="email"
                                />
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder=""
                                />
                                 <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="password"
                                />
                                <label className="label">
                                    <span className="label-text font-bold">Nomor Telepon</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="phone"
                                    name="phone"
                                    type="phone"
                                    placeholder=""
                                />
                                 <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="phone"
                                />
                                <label className="label">
                                    <span className="label-text font-bold">Pekerjaan</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="profession"
                                    name="profession"
                                    type="profession"
                                    placeholder=""
                                />
                                 <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="profession"
                                />
                                <label className="label">
                                    <span className="label-text font-bold">Kebutuhan</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="need"
                                    name="need"
                                    type="need"
                                    placeholder=""
                                />
                                 <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="need"
                                />
                                <label className="label">
                                    <span className="label-text font-bold">Nama Institusi</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="institutionName"
                                    name="institutionName"
                                    type="institutionName"
                                    placeholder=""
                                />
                                 <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="institutionName"
                                />
                                <label className="label">
                                    <span className="label-text font-bold">Alamat Institusi</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="institutionAddress"
                                    name="institutionAddress"
                                    type="institutionAddress"
                                    placeholder=""
                                />
                                 <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="institutionAddress"
                                />
                                <div className="m-8 text-center">
                                    <p>Sudah punya akun? <Link href="/login" className="text-title">Login</Link></p>
                                    <button type="submit" className="btn btn-accent w-full flex justify-center py-2 px-4">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}