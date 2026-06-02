import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../api/axios';

const Orders = () => {
    const [order,setOrders]=useState([]);
    useEffect(()=>{
        fetchOrders();
    },[]);
    const fetchOrders=async()=>{
        try{
            const {data}=await api.get("/api/orders/fetchOrders");
            // console.log(data.orders);
            setOrders(data);
        }catch(err){
            toast.error(err.response?.data?.message || err.message);
        }
    }
  return (
    <div>
        {console.log(order.orders)}
    </div>
  )
}

export default Orders
