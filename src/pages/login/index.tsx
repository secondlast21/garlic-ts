import Link from "next/link"
import Navbar from "@/components/navbar/Navbar"
import LoginForm from "@/components/loginForm/LoginForm"

export default function Login() {
    return (
        <div>
            <Navbar />
            <LoginForm />
        </div>
    )
}