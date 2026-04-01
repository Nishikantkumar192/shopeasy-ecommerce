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
    //actually here in data we get the data that i am sending from backend and if i use it as const res=  then here res=res.data
    const newUser=async(url,input)=>{
      try{
        const {data}=await api.post(url,input);
        toast.success(data.message);
      }catch(err){
        toast.error(err.response?.data?.message || err.message);

        //err.response?.data?.message      how it works.
          //err = {
          //   message: "Request failed with status code 404",
          //   response: {
          //     data: {
          //       message: "Not Found"
          //     },
          //     status: 404,
          //     headers: {...}
          //   },
          //   request: {...},
          //   config: {...}
          // }
      }
    }
      const LogoutUser=async()=>{
        try{
          const {data}=await api.get("/api/auth/logout");
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
    const deleteProduct=async(id)=>{
      try{
          const {data}=await api.get(`/api/product/deleteItem/${id}`);
          if(data.success===true){
          const updateChange=products.filter((product)=>product._id!==id);
          setProducts(updateChange);
          }
          toast.success(data.message);
        }catch(err){
          toast.error(err.response?.data?.message || err.message);
        }
    }
    const CallUpdateDetails=async(formData,id)=>{
      try{
        const {data}=await api.post(`/api/product/updateItemInformation/${id}`,formData);
        toast.success(data.message);
      }catch(err){
        toast.error(err.response?.data?.message || err.message);
      }
    }
    const values={
      addProduct,newUser,getProducts,products
      ,deleteProduct,LogoutUser,CallUpdateDetails
    }
  return (
    <div>
      <NoteContext.Provider value={values}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
