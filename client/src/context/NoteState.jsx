import NoteContext from "./NoteContext"
import api from "../api/axios";
import {toast } from 'react-toastify';

const NoteState = (props) => {

    const addProduct= async(formData)=>{
        try{
            const {data}=await api.post("/api/product/newItem",formData);
            toast.success(data.message);
        }catch(err){
            toast.error(err.message);
        }
    }
    const newUser=async(input)=>{
      try{
        const {data}=await api.post("/api/auth/register",input);
        toast.success(data.message);
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
