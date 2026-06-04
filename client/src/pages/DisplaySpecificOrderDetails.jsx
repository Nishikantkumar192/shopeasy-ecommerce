import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import ShowProduct from "../components/ShowProduct";

const DisplaySpecificOrderDetails = () => {
  const [details,setDetails]=useState({});
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
  return (
    <div className="flex flex-wrap flex-col mt-12 p-4 min-h-screen bg-pink-400">
      <div className="w-full text-center text-3xl">Order_owner : {details?.relatedUser?.username}</div>
      <span className="text-2xl">Amount: &#8377;{details.amount}</span>
      <span className="text-xl">Order_Status: {details.orderStatus}</span>
      <span className="text-xl">Payment_status : {details.paymentStatus}</span>
      <span className="text-xl">Address : {details.relatedUser?.address}</span>
      <span className="text-xl">Phone_number : {details.relatedUser?.phone_no}</span>
      <div className="flex flex-wrap gap-12 mt-8 items-center">
      {details?.products?.map((product)=>{
        return <ShowProduct item={product.productId} key={product._id}/>
      })}
      {console.log(details.products)}
      </div>
    </div>
  );
};

export default DisplaySpecificOrderDetails;
