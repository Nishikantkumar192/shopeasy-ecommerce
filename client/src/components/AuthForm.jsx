import { useContext, useState } from "react"
import Button from "./Button";
import NoteContext from "../context/NoteContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaUserAlt , FaLock } from "react-icons/fa";
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
    const show_hidePassword=()=>{
        if(visibility===true) setVisibility(false);
        else setVisibility(true);
    }
    const handleSubmit=(e)=>{
        try{
            e.preventDefault();
            newUser(input);
            setInput(initialState);
        }catch(err){
            toast.error(err.message);
        }
    }
  return (
    <div className="bg-[url(/images/backgroundImg.jpg)] bg-cover min-h-screen flex flex-col pt-[100px] items-center p-[2rem]">
        <h1 className="text-4xl font-bold text-white">{state} YourSelf</h1>
        <div className="form-inputs bg-white/10 backdrop-blur-md p-8 mt-4 rounded-lg">
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
                   {visibility===true?<span className="text-sm" onClick={show_hidePassword}>Show</span>:<span className="text-sm" onClick={show_hidePassword}>Hide</span>}
                </div>
                {state==="Log-in" && <Link className="text-black underline mb-[10px] block" to="/forget-password">forget password?</Link>}
                <Button work={state}/>
            </form>
            {state==="Sign-up"?<p>Already have an account? <span className="text-blue-900 underline cursor-pointer" onClick={()=>{setState("Log-in"),setInput(initialState)}}>log-in</span></p>:
            <p>Create an account? <span className="text-blue-900 underline cursor-pointer text-white" onClick={()=>{setState("Sign-up"),setInput(initialState)}}>Sign-up</span></p>}
        </div>
    </div>
  )
}

export default AuthForm
