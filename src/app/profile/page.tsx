"use client"
import axios from "axios"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"
import react ,{ useState } from "react"

export default function ProfilePage() {

    const router = useRouter()
    const [data,setData] = useState('nothing')
    const logout = async () =>{
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successfull')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <div><Toaster/></div>
            <hr/>
            <p>Profile Page</p>
            <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>

            <button onClick={logout}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >Logout</button>

            <button onClick={getUserDetails}
            className="text-white bg-purple-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >Get User Details</button>
        </div>
    )
}