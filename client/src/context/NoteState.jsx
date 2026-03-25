import NoteContext from "./NoteContext"
import api from "../api/axios";
import {toast } from 'react-toastify';
import { useState } from "react";

const NoteState = (props) => {
  const [products,setProducts]=useState([]);

    const addProduct= async(formData)=>{
        try{
            const {data}=await api.post("/api/product/newItem",formData);
            toast.success(data.message);
        }catch(err){
            toast.error(err.response?.data?.message||err.message);
        }
    }
    const newUser=async(url,input)=>{
      try{
        const {data}=await api.post(url,input);
        toast.success(data.message);
      }catch(err){
        toast.error(err.response?.data?.message || err.message);
      }
    }
    const getProducts=async()=>{
      try{
        const {data}=await api.get("/api/product/getProducts");
        setProducts(data);
      }catch(err){
        toast.error(err.response?.data?.message || err.message);
      }
    }
  return (
    <div>
      <NoteContext.Provider value={{addProduct,newUser,getProducts,products}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
