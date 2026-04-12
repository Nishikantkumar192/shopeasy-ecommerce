import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const OtpSendForm = () => {
  const initialState={
    email:"",
  }
    const [info,setInfo]=useState(initialState);
    const handleChange=(e)=>{
      setInfo({
        ...info,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        sendOtp();
        setInfo(initialState);
    }
    const sendOtp=async()=>{
      try{
        const {data}=await api.post("/api/auth/sendOtp",info);
        toast.success(data.message);
      }catch(err){
        toast.error(err.response?.data?.message || err.message);
      }
    }
 return (
  <div className="w-full bg-white/10 backdrop-blur-md border border-gray-700 rounded-xl p-4 shadow-md">
    
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      
      <input
        className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
        type="email"
        name="email"
        placeholder="Enter your verified email"
        value={info.email}
        onChange={handleChange}
        required
      />

      <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-md transition duration-200 cursor-pointer">
        Send OTP
      </button>

    </form>
  </div>
);
};

export default OtpSendForm;
