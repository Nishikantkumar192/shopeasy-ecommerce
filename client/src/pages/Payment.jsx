import React from "react";
import api from "../api/axios";
const Payment = (props) => {
  const handlePayment = async () => {
    const { data } =await api.post("/api/order/create-order", props.totalAmount);
    console.log(data);
    const options = {
      key: "rzp_test_Sd5LIu1YzylBAa",
      amount: data.amount,
      currency: "INR",
      name: "shopeasy",
      description: "Order Payment",
      order_id: data.id,
      handler: async function (response) {
        const verify = await api.post("/api/order/verifyPayment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        console.log(verify);
        if (verify.data.success) {
          alert("payment successful!");
        } else {
          alert("payment Failed");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="w-full font-medium p-4 bg-orange-500 shadow-lg text-2xl flex justify-between items-center">
      <div className="p-2 flex flex-col"><span className="line-through">&#8377;{props.totalOldPrice}</span> &#8377;{props.totalAmount}</div>
      <div
        onClick={() => {
          handlePayment();
        }}
        className="p-2 border-1 cursor-pointer"
      >
        Continue
      </div>
    </div>
  );
};

export default Payment;
