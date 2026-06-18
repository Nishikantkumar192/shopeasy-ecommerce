import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import DisplayMyOrders from "./DisplayMyOrders";

const MyOrders = () => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const [orders, setOrders] = useState([]);
  const fetchingOrders = async () => {
    try {
      const { data } = await api.get("/api/orders/fetching-my-orders");
      setOrders(data.myOrders);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  useEffect(() => {
    fetchingOrders();
  }, []);
  const removeHistory=async(id)=>{
    try{
      const {data}=await api.get(`/api/orders/remove-order-history-for-user/${id}`);
      toast.success(data.success);
      fetchingOrders();
    }catch(err){
      toast.error(err.response?.data?.message || err.message);
    }
  }
  if (orders.length === 0) {
    return (
      <div className="bg-black min-h-screen flex justify-center items-center overflow-hidden">
        <h1 className="text-white text-4xl">Empty History Details</h1>
      </div>
    );
  }
  return (
    <div className="bg-red-600 min-h-screen flex flex-col p-4 gap-4">
      {orders.map((order) => {
        return(
      <div className="border flex flex-wrap justify-between gap-4 p-4">
        <div className="flex flex-wrap gap-4">
          {order.products.map((product) => {
          return <DisplayMyOrders obj={product} key={order._id} />;
        })}
        </div>
        <div>
      <span className="text-xl text-bold sticky right-0" onClick={()=>removeHistory(order._id)}>X</span>
      </div>
      </div>)
      })}
    </div>
  );
};

export default MyOrders;
