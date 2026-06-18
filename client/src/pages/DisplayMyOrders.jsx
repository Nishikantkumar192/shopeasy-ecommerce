import React from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const DisplayMyOrders = ( {obj} ) => {

  return (
    <div className="flex flex-col flex-wrap max-w-[700px] bg-white p-4">
      <p className="text-black">Amount:{obj.productId.price} </p>
      <p className="text-black">Booked-Date: {obj.productId.name} </p>
    </div>
  );
};

export default DisplayMyOrders;
