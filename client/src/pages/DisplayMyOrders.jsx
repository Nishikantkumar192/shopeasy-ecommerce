import React from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const DisplayMyOrders = ( {obj} ) => {

return (
  <div className="w-full max-w-[700px] bg-white rounded-2xl border border-gray-200 p-4 shadow-md">

    {/* Product Image */}
    <div className="w-full h-72 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
      <img
        src={obj.productId.image.url}
        alt="product Image"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Product Details */}
    <div className="mt-5 space-y-3">

      <div className="flex justify-between border-b border-gray-100 pb-2">
        <span className="text-gray-500">Brand</span>
        <span className="font-semibold text-gray-800">
          {obj.productId.brand}
        </span>
      </div>

      <div className="flex justify-between border-b border-gray-100 pb-2">
        <span className="text-gray-500">Quantity</span>
        <span className="font-semibold text-gray-800">
          {obj.quantity}
        </span>
      </div>

      <div className="flex justify-between border-b border-gray-100 pb-2">
        <span className="text-gray-500">Amount</span>
        <span className="font-bold text-green-600 text-lg">
          ₹{obj.productId.price}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Product</span>
        <span className="font-semibold text-gray-800">
          {obj.productId.name}
        </span>
      </div>

    </div>
  </div>
);
};

export default DisplayMyOrders;
