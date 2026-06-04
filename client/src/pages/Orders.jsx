import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../api/axios';
import ShowOrder from './ShowOrder';

const Orders = () => {
    const [order,setOrders]=useState([]);
    useEffect(()=>{
        fetchOrders();
    },[]);
    const fetchOrders=async()=>{
        try{
            const {data}=await api.get("/api/orders/fetchOrders");
            setOrders(data.orders);
        }catch(err){
            toast.error(err.response?.data?.message || err.message);
        }
    }
  return (
    <div className='flex justify-center flex-wrap min-h-screen bg-black mt-12'>
        {order.map((obj)=>{
            return <ShowOrder obj={obj} key={obj._id}/>
        })}
    </div>
  )
}

export default Orders
