import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import LoginForm from "@/components/loginForm/LoginForm";
import LoginWelcome from "@/components/loginForm/LoginWelcome";

export default function Login() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <LoginWelcome />
        <LoginForm />
      </div>
    </div>
  );
}
