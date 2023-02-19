import { getTokenFromLocalStorage } from "@/utils/tokenManager"
import { removeTokenFromLocalStorage } from "@/utils/tokenManager"
import { useRouter } from "next/router"

export default function Profile() {
    const router = useRouter()

    const handleClick = () => {
        removeTokenFromLocalStorage()
        const token2 = getTokenFromLocalStorage()
        console.log(token2)
        router.replace("/");
    
    }

    return (
        <div>
            <h1>Ini Halaman Profile</h1>
            <button className="btn btn-ghost rounded-btn text-title" onClick={handleClick}>
                Logout
            </button>
        </div>
    )
}