"use client";
import Link from "next/link";
import React, {useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {Toaster, toast} from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
})
const [buttonDisabled, setbuttonDisabled] = useState(false);
const [loading, setLoading] = useState(false);


  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log(response)
      console.log("SignUp success", response.data);
      toast.success("SignUp success");
      router.push('/login');
    } catch (error: any) {
        console.log("Signup Failed", error.message);
        toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setbuttonDisabled(false)
    }else {
      setbuttonDisabled(true)
    }

  },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div><Toaster/></div>
      <h1 className="text-5xl">{loading? 'Processing' : 'SignUp'}</h1>
      <hr />
      <div className="flex w-150 h-20 items-center">
        <label className="px-5" htmlFor="username">
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
          placeholder="username"
        />
      </div>

        <div className="flex w-150 h-20 items-center" >
          <label className="px-5" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter email"
          />
        </div>

        <div className="flex w-150 h-20 items-center" >

          <label className="px-5" htmlFor="password">
            Password
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter password"
          />
        </div>
        <button
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            {buttonDisabled ? "No signup" : "Signup"}
        </button>
        <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
