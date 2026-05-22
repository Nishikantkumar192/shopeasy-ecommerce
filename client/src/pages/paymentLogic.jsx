import React from "react";
import api from "../api/axios";
const paymentLogic = () => {
  const handlePayment = async () => {
    const { data } = await api.post("/api/order/create-order", 500);
    const options = {
      key: "rzp_test_Sd5LIu1YzylBAa",
      amount: data.amount,
      currency: "INR",
      name: "shopeasy",
      description: "Order Payment",
      order_id: data.id,
      handler: async function (response) {
        const verify = await api.post("/api/order/verifyPayment", {
          razorpay_order_id: responserazorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
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
  return <button onClick={handlePayment}>Pay &#8377;</button>;
};
