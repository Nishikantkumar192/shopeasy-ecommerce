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
  <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-6 px-4 py-6">
    {orders.map((order) => {
      return (
        <div
          className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-gray-200 p-5 
                     flex flex-wrap items-center justify-between gap-6
                     hover:shadow-lg transition-shadow duration-200"
        >
          {/* Products */}
          <div className="flex flex-wrap gap-4 flex-1">
            {order.products.map((product) => {
              console.log(product);
              return (
                <DisplayMyOrders
                  obj={product}
                  key={order._id}
                />
              );
            })}
          </div>

          {/* Remove */}
          <div>
            <span
              className="inline-block px-4 py-2 rounded-lg bg-red-50 text-red-600 
                         font-semibold cursor-pointer hover:bg-red-600 hover:text-white 
                         transition-all duration-200"
              onClick={() => removeHistory(order._id)}
            >
              Remove
            </span>
          </div>
        </div>
      );
    })}
  </div>
);
};

export default MyOrders;
