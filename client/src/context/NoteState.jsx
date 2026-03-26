import NoteContext from "./NoteContext"
import api from "../api/axios";
import {toast } from 'react-toastify';
import { useState } from "react";

const NoteState = (props) => {
  const [products,setProducts]=useState([]);
  const [item,setItem]=useState({});
  const [isLoggedIn,setIsLoggedIn]=useState(null);    //if i use {} then if user doesn't exist but it will show true thats why i have not used.

    const isUserLoggedIn=async()=>{
      try{
        const {data}=await api.get("/api/auth/UserExist");
        
      }catch(err){
        toast.error(err.response?.data?.message || err.message);
      }
    }

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
      const LogoutUser=async()=>{
        try{
          const {data}=await api.get("/api/auth/logout");
          setIsLoggedIn(null);
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
    const getItemInformation=async(id)=>{
      try{
        const {data}=await api.get(`/api/product/updateItemInformation/${id}`);
        setItem(data.item);
        toast.success(data.message);
      }catch(err){
        toast.error(err.response?.data?.message || err.message);
      }
    }
    const deleteProduct=async(id)=>{
      try{
          const {data}=await api.get(`/api/product/deleteItem/${id}`);
          const updateChange=products.filter((product)=>product._id!==id);
          setProducts(updateChange);
          toast.success(data.message);
        }catch(err){
          toast.error(err.response?.data?.message || err.message);
        }
    }
    const values={
      addProduct,newUser,getProducts,products,getItemInformation,
      item,deleteProduct,LogoutUser,isUserLoggedIn,isLoggedIn
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
