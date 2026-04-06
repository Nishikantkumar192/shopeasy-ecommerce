import { useState } from "react";

const OtpSendForm = () => {
    const [email,setEmail]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        sendOtp();
        setEmail("");
    }
  return (
    <div className="bg-red-900 p-2 px-4 p-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        <input
          className="outline-none px-1 "
          type="email"
          name="email"
          placeholder="Enter your verified Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <button className="bg-green-400 px-4 rounded-sm py-1">Send</button>
      </form>
    </div>
  );
};

export default OtpSendForm;
