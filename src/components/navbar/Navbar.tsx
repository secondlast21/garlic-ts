import Link from "next/link"
import Image from "next/image"
import logoIpb from "../../../public/logo_ipb.png"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 text-black">
            <div className="navbar bg-base-100 rounded-box">
                <div className="flex-1 px-2 lg:flex-none">
                    <Image
                        src={logoIpb}
                        className="w-16 h-16 relative cursor-pointer"
                        alt=""
                    />
                    <Link href="/" className="btn btn-ghost normal-case text-xl font-bold">INA Agro-Garlic</Link>
                </div> 
                <div className="flex justify-end flex-1 px-2">
                    <div className="flex items-stretch">
                        <Link href="/" className="btn btn-ghost rounded-btn">Home</Link>
                        <Link href="/about" className="btn btn-ghost rounded-btn">About</Link>
                        <div className="dropdown dropdown-bottom">
                            <label tabIndex={0} className="btn btn-ghost rounded-btn">
                                Peta Kesesuaian Lahan
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                            </label>
                            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 z-50">
                                <li><Link href="/peta-kesesuaian-spt">Data SPT</Link></li>
                                <li><Link href="/peta-kesesuaian-pengguna">Data Pengguna</Link></li>
                            </ul>
                        </div>
                        <Link href="#" className="btn btn-ghost rounded-btn">Penilaian Kesesuaian Lahan</Link>
                        <Link href="#" className="btn btn-ghost rounded-btn">Glosarium</Link>
                        <Link href="#" className="btn btn-accent rounded-full">Login</Link>
                    </div>
                </div>
            </div>
        </header>
    )
  }
  