import Link from "next/link";
import Image from "next/image";
import logoIpb from "../../../public/logo_ipb.png";
import { getTokenFromLocalStorage } from "@/utils/tokenManager";
import { removeTokenFromLocalStorage } from "@/utils/tokenManager";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isTokenExisted, setIsTokenExisted] = useState(false);
  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      setIsTokenExisted(true);
    } else {
      setIsTokenExisted(false);
    }
  }, []);

  const AuthFeature = () => {
    return (
      <>
        <Link
          href="/penilaian-kesesuaian-lahan"
          className="btn btn-ghost rounded-btn"
        >
          Penilaian Kesesuaian Lahan
        </Link>
        <Link href="/download-file" className="btn btn-ghost rounded-btn">
          Download File
        </Link>
        <Link href="/input-file" className="btn btn-ghost rounded-btn">
          Input File
        </Link>
        <Link href="/glosarium" className="btn btn-ghost rounded-btn">
          Glosarium
        </Link>
      </>
    );
  };

  return (
    <header className="fixed w-full top-0 z-50 text-black">
      <div className="navbar bg-base-100">
        <div className="flex-1 px-2 lg:flex-none">
          <Image
            src={logoIpb}
            className="w-16 h-16 relative cursor-pointer"
            alt=""
          />
          <Link
            href="/"
            className="btn btn-ghost normal-case text-xl font-bold"
          >
            INA Agro-Garlic
          </Link>
        </div>
        <div className="flex justify-end flex-1 px-2">
          <div className="flex items-stretch">
            <Link href="/" className="btn btn-ghost rounded-btn">
              Home
            </Link>
            <Link href="/about" className="btn btn-ghost rounded-btn">
              About
            </Link>
            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                Peta Kesesuaian Lahan
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 z-50"
              >
                <li>
                  <Link href="/peta-kesesuaian-spt">Data SPT</Link>
                </li>
                <li>
                  <Link href="/peta-kesesuaian-pengguna">Data Pengguna</Link>
                </li>
              </ul>
            </div>
            <div className="flex-grow"></div>
            {isTokenExisted && <AuthFeature />}
            {!isTokenExisted ? (
              <Link
                href="/login"
                className="btn btn-ghost rounded-btn text-title"
              >
                Login
              </Link>
            ) : (
              <Link href="/profile" className="btn btn-ghost rounded-btn">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full bg-s1"></div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
