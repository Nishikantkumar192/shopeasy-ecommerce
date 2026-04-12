import { useState } from "react"
import OtpSendForm from "./OtpSendForm"
import {toast} from "react-toastify"
import api from "../api/axios.js"
import { Link } from "react-router-dom"

const ForgetForm = () => {
    const initialState={
        otp:"",
        password:"",
    }
    const [detail,setDetail]=useState(initialState);
    const handleChange=(e)=>{
        setDetail({
            ...detail,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        forgetPassword();
        setDetail(initialState);
    }
    const forgetPassword=async()=>{
        try{
            const {data}=await api.post("/api/auth/forget-password",detail);
            toast.success(data.message);
        }catch(err){
            toast.error(err.response?.data?.message || err.message);
        }
    }
 return (
  <div className="bg-[url(/images/backgroundImg.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
    
    <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-6">
      
      <h2 className="text-2xl font-semibold text-white text-center mb-4">
        Reset Password
      </h2>

      <OtpSendForm />

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        
        <div className="flex flex-col">
          <label className="text-black text-sm mb-1" htmlFor="otp">
            OTP
          </label>
          <input
            className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter OTP"
            value={detail.otp}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black text-sm mb-1" htmlFor="password">
            New Password
          </label>
          <input
            className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="password"
            name="password"
            id="password"
            placeholder="Enter new password"
            value={detail.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-md transition duration-200"
        >
          Submit
        </button>
        <div><span className="text-lg px-2">Remember your password?</span><Link className="text-lg underline text-white" to={"/log-in"}>Log-in</Link></div>
      </form>
    </div>
  </div>
);
}

export default ForgetForm
