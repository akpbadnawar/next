"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import './style.css';

export default function ForgetPassword() {
  const router = useRouter();
  const userEmail = useSelector((data: any) => data.email);
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']); // Maintain state for OTP

  // Function to handle input changes and move to the next component
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
  
    // If backspace is pressed and the input is empty, move to the previous input field
    if (value === '' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  
    newOtp[index] = value;
  
    // Move to the next input field if the current input is filled
    if (value && index < newOtp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  
    setOtp(newOtp);
  };

  // Function to get OTP (Replace the API endpoint and logic accordingly)
  const handleResetPassword = async () => {
    try {
      const otpValue = otp.join('');
      console.log(otpValue);

      // Check if the OTP length is 6 before making the API call
      if (otpValue.length === 6) {
        const response = await axios.post("/api/users/otp", { email: userEmail, otp: otpValue });
        console.log("Login Success", response.data);
        //  
        toast.success("OTP Verified");
        toast.success(response.data.message);
      } else {
        // Show an error message if the OTP length is not 6
        toast.error("Please enter a valid 6-digit OTP");
      }
    } catch (error) {
      // Handle error and show appropriate messages
      toast.error(error.response.data.message);
    }
  };

  const isResetDisabled = otp.some(value => !value) || otp.length !== 6;

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">  
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                OTP Sent on Email:-
              </label>
              <input
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={userEmail}
              ></input>
            </div>
            <div>
              <div className="otp-field justify-between">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={isResetDisabled}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>

            <Link
              href={"/forgotPass"}
              className="flex justify-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Change email
            </Link>

            <p>Have an account?</p>
            <div className="flex justify-end">
              <Link
                href="/login"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login Page
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
