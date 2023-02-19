import { Field, Form, Formik, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link"

export default function RegisterForm() {
    return (
        <div>
            Ini Register Form
            Sudah punya akun? <Link href="/login">Login</Link>
        </div>
    )
}