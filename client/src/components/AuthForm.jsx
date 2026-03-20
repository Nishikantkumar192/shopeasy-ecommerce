import { useContext, useState } from "react"
import Button from "./Button";
import NoteContext from "../context/NoteContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaUserAlt , FaLock,FaRegEye,FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
    const navigate=useNavigate();
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
    const handleSubmit=(e)=>{
        try{
            e.preventDefault();
            newUser(input);
            setInput(initialState);
            navigate("/")
        }catch(err){
            toast.error(err.message);
        }
    }
  return (
    <div className="bg-gray-600 min-h-screen flex flex-col pt-[100px] items-center p-[2rem]">
        <h1 className="text-4xl font-bold text-white">{state} YourSelf</h1>
        <div className="form-inputs bg-pink-400 p-8 mt-4 rounded-lg">
            <form onSubmit={handleSubmit}>
                {state==="Sign-up" && <label className="font-bold" htmlFor="username">Username</label>}
                {state==="Sign-up" &&
                <div>
                    <FaUserAlt/>
                    <input type="text" id="username" name="username" placeholder="Enter Username" value={input.username} onChange={handleChange} required/>
                </div>}
                <label className="font-bold" htmlFor="email">Email-id</label>
                <div>
                    <MdEmail/>
                    <input type="email" id="email" name="email" placeholder="Enter a valid Email" value={input.email} onChange={handleChange} required/>
                </div>
                <label className="font-bold" htmlFor="password">password</label>
                <div>
                    <FaLock/>
                    <input type={visibility===true?"password":"text"} id="password" name="password" placeholder="Enter your password" value={input.password} onChange={handleChange} required />
                   {visibility===true?<FaRegEyeSlash onClick={()=>setVisibility(false)}/>:
                    <FaRegEye onClick={()=>setVisibility(true)}/>}
                </div>
                <Link className="text-blue-900 underline mb-[10px] block" to="/forget-password">forget password?</Link>
                <Button work={state}/>
            </form>
            {state==="Sign-up"?<p>Already have an account? <span className="text-blue-900 underline cursor-pointer" onClick={()=>{setState("Log-in"),setInput(initialState)}}>log-in</span></p>:
            <p>Create an account? <span className="text-blue-900 underline cursor-pointer" onClick={()=>{setState("Sign-up"),setInput(initialState)}}>Sign-up</span></p>}
        </div>
    </div>
  )
}

export default AuthForm
