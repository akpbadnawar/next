"use client"
import Link from "next/link";
import React,{useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast, { Toaster } from "react-hot-toast";
import '../forgotPass/style.css'
import { addEmail } from "../GlobalRedux/slice";
import {useDispatch} from 'react-redux';


export default function ForgetPassword () {
    const router = useRouter()
    const [email1, setEmail] = useState("");

    const [loading,setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const dispatch = useDispatch();

    
    const onReset = async ()  =>{
       
        try{
            setLoading(true)
            // const response = await axios.post("api/users/reset",user); 
            console.log("Reset Mail sent", response.data);  
            router.push('/otp')
            toast.success("Mail sent success");
          } catch(error:any){
              console.log("Mail not Sent", error.message);
              toast.error(error.message);
          } finally{
            setLoading(false)
            router.push('/otp')
          }
    }

    const onDispatch = async() =>{
        try {
            dispatch(addEmail(email1))
        } catch (error:any) {           
            console.log('Error in setting email', error.message);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(email1.length>0)
        {
           setButtonDisabled(false);
         } else{
           setButtonDisabled(true);
         }
   },[email1]);
        

return(
        <section className="bg-gray-50 dark:bg-gray-900">
        <div><Toaster/></div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
              Flowbite  
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Change Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}></input>
                  </div>              
                                  
                  <button type="button" onClick={()=>{onReset();onDispatch()}} disabled={buttonDisabled} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>

                  <p >Have account?</p>
                  <div className="flex justify-end"><Link href="/login"  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login Page</Link></div>
              </form>    
          </div>   
      </div>
    </section>
    )    
}