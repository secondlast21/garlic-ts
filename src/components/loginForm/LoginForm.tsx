import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import logoIpb from "../../../public/logo_ipb.png"
import Image from "next/image";
import { useMutation } from "react-query";
import { useState } from "react";
import { TLogin, login } from "@/services/authService";
import { setTokenInLocalStorage } from "@/utils/tokenManager";
import { useRouter } from "next/router";
import Link from "next/link";

const styles = {
    label: "block text-black text-sm font-bold pt-2 pb-1",
    field:
      "bg-gray-200 text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
    errorMsg: "text-red-500 text-sm",
};

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState('')
    const router= useRouter()
    const { mutate, reset } = useMutation(login, {
        onSuccess: (data) => {
            const token = data?.data.token
            console.log(token)
            if (token) {
                setTokenInLocalStorage(token)
                reset()
                router.push('/')
            }
        },
        onError: (error: any) => {
            setErrorMessage(error?.message)
        },
    })

    const handleSubmit = (data: TLogin) => mutate(data)
    
    const loginSchema = Yup.object().shape({
        email: Yup.string().email().required("Required"),
        password: Yup.string().required("Required").min(8, "Too Short!"),
    });

    return (
        <div className="min-h-screen font-display flex bg-accent items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Image
                        src={logoIpb}
                        className=" w-36 right-0 mx-auto"
                        alt=""
                    />
                    <h3 className="mt-6 text-center text-3xl font-bold text-black">Masuk Akun INA-Agro Garlic</h3>
                </div>
                <div className="flex-grow rounded bg-white p-8 flex items-center justify-center">
                    <Formik 
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={loginSchema}
                        onSubmit={(values: TLogin) => {
                            handleSubmit(values)
                        }}
                    >
                        <Form>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <Field
                                    className="input input-bordered w-full max-w-xs"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Masukkan email"
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
                                    placeholder="Masukkan password"
                                />
                                 <ErrorMessage
                                    component="a"
                                    className={styles.errorMsg}
                                    name="password"
                                />
                                <div className="m-8 text-center">
                                    <p>Belum punya akun? <Link href="/register" className="text-title">Register</Link></p>
                                    <button type="submit" className="btn btn-accent w-full flex justify-center py-2 px-4">
                                        Login
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