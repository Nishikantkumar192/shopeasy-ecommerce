import { useState } from "react"
import OtpSendForm from "./OtpSendForm"
import {toast} from "react-toastify"
import api from "../api/axios.js"

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
    <div className="min-h-screen flex flex-col bg-gray-900 justify-center items-center">
        <div className="w-full max-w-[350px] bg-yellow-400 p-4">
            <OtpSendForm/>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex flex-col mt-2">
                    <label className="text-bold" htmlFor="otp">OTP</label>
                    <input className="px-2 h-8 outline-none" type="text" name="otp" id="otp" placeholder="Enter valid OTP" value={detail.otp} onChange={handleChange} required/>
                </div>
                <div className="flex flex-col mt-2">
                    <label className="text-bold" htmlFor="password">password</label>
                    <input className="px-2 h-8 outline-none" type="password" name="password" id="password" placeholder="Enter new password" value={detail.password} onChange={handleChange} required/>
                </div>
                <button className="bg-green-600 rounded-md px-4 py-1 cursor-pointer mt-2">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ForgetForm
