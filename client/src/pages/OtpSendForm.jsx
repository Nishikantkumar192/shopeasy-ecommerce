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
    <div className="bg-red-900 p-2 px-4 p-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap flex-col">
        <input
          className="outline-none px-1 "
          type="email"
          name="email"
          placeholder="Enter your verified Email"
          value={info.email}
          onChange={handleChange}
          required
        />
        <button className="bg-green-400 px-4 rounded-sm py-1 mt-2 hover:opacity-75 cursor-pointer">Send</button>
      </form>
    </div>
  );
};

export default OtpSendForm;
