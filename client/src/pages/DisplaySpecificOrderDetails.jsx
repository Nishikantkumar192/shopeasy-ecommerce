import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import ShowProduct from "../components/ShowProduct";

const DisplaySpecificOrderDetails = () => {
  const [details,setDetails]=useState({});
  const [visibility,setVisibility]=useState(false);
  const { id } = useParams();
  useEffect(() => {
    userOrderDetails();
  }, []);
  const userOrderDetails = async () => {
    try {
      const { data } = await api.post(`/api/orders/specificOrderDetails/${id}`);
      setDetails(data.orderDetails)
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };
  const handleVisibility=()=>{
    setVisibility(visibility?false:true);
  }
  return (
    <div className="flex flex-wrap items-center flex-col mt-12 p-4 min-h-screen bg-pink-400">
      <div className="w-full text-center text-3xl mb-10">Order_owner : {details?.relatedUser?.username}</div>
      <span className="text-2xl">Amount: &#8377;{details.amount}</span>
      <span className="text-xl cursor-pointer underline" onClick={()=>handleVisibility()}>Order_Status: {details.orderStatus}</span>
      {visibility && <select className="outline-none text-2xl" name="status">
        <option value="">Change order status</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>}
      <span className="text-xl">Payment_status : {details.paymentStatus}</span>
      <span className="text-xl">Address : {details.relatedUser?.address}</span>
      <span className="text-xl">Phone_number : {details.relatedUser?.phone_no}</span>
      <div className="flex flex-wrap justify-center gap-12 pt-20 ">
      {details?.products?.map((product)=>{
        return <ShowProduct item={product.productId} key={product._id}/>
      })}
      </div>
    </div>
  );
};

export default DisplaySpecificOrderDetails;
