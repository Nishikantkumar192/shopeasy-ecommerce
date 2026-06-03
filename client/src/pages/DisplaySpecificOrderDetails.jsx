import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const DisplaySpecificOrderDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    userOrderDetails();
  }, []);
  const userOrderDetails = async () => {
    try {
      const { data } = await api.post(`/api/orders/specificOrderDetails/${id}`);
      console.log(data);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };
  return (
    <div className="text-2xl mt-20">
      <h1>It's order specific</h1>
    </div>
  );
};

export default DisplaySpecificOrderDetails;
