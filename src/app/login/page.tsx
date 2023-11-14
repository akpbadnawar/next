"use client";
import Link from "next/link";
import React,{useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);


  const onLogin = async () => {
    try{
      setLoading(true);
      const response = await axios.post("/api/users/login",user);
      toast.success("Login success");
      console.log("Login Success", response.data);
      router.push('/profile');
    } catch(error:any){
        console.log("Login Failed", error.message);
        toast.error(error.message);
    } finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0)
     {
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
},[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div><Toaster/></div>
      <h1 className="text-5xl">{loading?"Logging In...":"Login"}</h1>
      <hr />
        <div className="flex w-150 h-20 items-center" >
          <label className="px-5" htmlFor="email">
            Email
          </label>
          <input
            className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
            id="email"
            type="text"
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
            className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter password"
          />
        </div>
        <button
          onClick={onLogin}
          className="p-2 border borger-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >Login here</button>
        <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}
