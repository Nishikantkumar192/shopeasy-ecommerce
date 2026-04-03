import { useEffect, useState } from "react"
import ProductForm from "../components/ProductForm"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"

const UpdateProductDetails = () => {
    const {id}=useParams();    //useParam() returns an object
    useEffect(()=>{
        ParticularProduct();
    },[id])

    const [info,setInfo]=useState({});
    const ParticularProduct=async()=>{
      try{
        const {data}=await api.get(`/api/product/updateItemInformation/${id}`);
        setInfo(data.item);
      }catch(err){
        toast.error(err.response?.data?.message || err.message);
      }
    }
  return (
    <div>
      <ProductForm heading="Update Detail" type="edit" work="Update" info={info} id={id}/>
    </div>
  )
}

export default UpdateProductDetails
