import NoteContext from "./NoteContext"
import axios from "axios";
import {toast } from 'react-toastify';

const NoteState = (props) => {
    const BackendUrl=import.meta.env.VITE_BACKEND_URL;

    const addProduct= async(item)=>{
        try{
          console.log(item);
            const {data}=await axios.post(`${BackendUrl}`+"/api/product/newItem",item);
            toast.success(data.message);
        }catch(err){
            toast.error(data.message);
        }
    }
    const newUser=async(input)=>{
      try{
        await axios.post(`${BackendUrl}`+"/api/auth/register",input);
        toast.success("registered successfully");
      }catch(err){
        toast.error(err.message);
      }
    }
  return (
    <div>
      <NoteContext.Provider value={{addProduct,newUser}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
