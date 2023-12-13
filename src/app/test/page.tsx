"use client"
import Link from "next/link";
import React,{useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";





const PasswordChange = () => {

    const router = useRouter()
    const userEmail = useSelector((data: any) => data.email);
    const [user, setUser] = useState({
    email: userEmail,
    password: "",
    username: "",
    requestType: "passChange"
})

const onPassChange  = async () => {
    try {
      const response = await axios.post('/api/users/signup', user);
      console.log(response)
      console.log("SignUp success", response.data);
      toast.success("SignUp success");
      router.push('/login');
    } catch (error: any) {
        console.log("Signup Failed", error.message);
        toast.error(error.message);
    } 
  };
    
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div>
        <Toaster />
      </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                New Password Creater    
                </a>
                <div>
                <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2 text-center"
              >
                Changing password for email
                    </label>
                    <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled
                    placeholder={userEmail}
                    />
                </div>
                <div>
                <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2 text-center"
              >
                New Password
                    </label>
                    <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder=" "
                    required
                    />

                    <label
                htmlFor="email"
                className="block mb-2 mt-2 text-center text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm new password
                    </label>
                    <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="password"
                    /> 
                </div>
                <div>
                    <button
                    className="mt-2 button w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="button"
                    onClick={onPassChange}
                    >Submit</button>
                </div>
            </div>
    </section>
  )
}

export default PasswordChange