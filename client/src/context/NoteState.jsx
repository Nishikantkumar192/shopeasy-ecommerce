import NoteContext from "./NoteContext"
import axios from "axios";
import {toast } from 'react-toastify';

const NoteState = (props) => {
    const BackendUrl=import.meta.env.VITE_BACKEND_URL;

    const addProduct= async(formData)=>{
        try{
            const {data}=await axios.post(`${BackendUrl}/api/product/newItem`,formData);
            toast.success(data.message);
        }catch(err){
            toast.error(err.message);
        }
    }
    const newUser=async(input)=>{
      try{
        const {data}=await axios.post(`${BackendUrl}`+"/api/auth/register",input);
        toast.success(data.message);
      }catch(err){
        toast.error(data.message);
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
