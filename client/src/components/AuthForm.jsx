import { useContext, useState } from "react"
import Button from "./Button";
import NoteContext from "../context/NoteContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaUserAlt , FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const AuthForm = () => {
    const context=useContext(NoteContext);
    const {newUser}=context;
    const initialState={
        username:"",
        email:"",
        password:"",
    }
    const [state,setState]=useState("Sign-up");
    const [input,setInput]=useState(initialState);
    const [visibility,setVisibility]=useState(true);
    const handleChange=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value,
        })
    }
    const show_hidePassword=()=>{
        if(visibility===true) setVisibility(false);
        else setVisibility(true);
    }
    const handleSubmit=(e)=>{
        try{
            e.preventDefault();
            if(state==="Sign-up"){
                newUser("/api/auth/register",input);
            }else{
                const payload={
                    email:input.email,
                    password:input.password,
                }
                newUser("/api/auth/login",payload);
            }
            setInput(initialState);
        }catch(err){
            toast.error(err.message);
        }
    }
return (
  <div className="bg-[url(/images/auth-background.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

      <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
        {state}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Username */}
        {state === "Sign-up" && (
          <>
            <label className="text-sm font-medium text-gray-200">Username</label>
            <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-purple-400 transition">
              <FaUserAlt className="text-gray-300" />
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="bg-transparent outline-none w-full placeholder-gray-400"
                required
              />
            </div>
          </>
        )}

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-200">Email</label>
          <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-purple-400 transition">
            <MdEmail className="text-gray-300" />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Enter a valid Email"
              className="bg-transparent outline-none w-full placeholder-gray-400"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-200">Password</label>
          <div className="flex items-center justify-between bg-white/20 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-purple-400 transition">
            
            <div className="flex items-center gap-3 w-full">
              <FaLock className="text-gray-300" />
              <input
                type={visibility ? "password" : "text"}
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full placeholder-gray-400"
                required
              />
            </div>

            <span
              onClick={show_hidePassword}
              className="text-xs text-purple-300 cursor-pointer hover:text-purple-500 transition"
            >
              {visibility ? "Show" : "Hide"}
            </span>
          </div>
        </div>

        {/* Forgot password */}
        {state === "Log-in" && (
          <Link
            to="/forget-password"
            className="text-xs text-right block text-purple-300 hover:underline"
          >
            Forgot password?
          </Link>
        )}

        {/* Button */}
        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition font-semibold">
          {state}
        </button>
      </form>

      {/* Toggle */}
      <p className="text-center text-sm mt-6 text-gray-300">
        {state === "Sign-up" ? (
          <>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Log-in");
                setInput(initialState);
              }}
              className="text-purple-400 font-semibold cursor-pointer hover:underline"
            >
              Log-in
            </span>
          </>
        ) : (
          <>
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign-up");
                setInput(initialState);
              }}
              className="text-purple-400 font-semibold cursor-pointer hover:underline"
            >
              Sign-up
            </span>
          </>
        )}
      </p>

    </div>
  </div>
);
}

export default AuthForm
