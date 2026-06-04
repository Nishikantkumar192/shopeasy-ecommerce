import React from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
const Payment = (props) => {
  const handlePayment = async () => {
    try {
      const { data } = await api.post("/api/order/create-order", {
        amount: props.totalAmount,
        products: props.products,
      });
      const options = {
        key: "rzp_test_Sd5LIu1YzylBAa",
        amount: data.order.amount,
        currency: "INR",
        name: "shopeasy",
        description: "Order Payment",
        order_id: data.order.orderId,
        handler: async function (response) {
          try {
            const verify = await api.post("/api/order/verifyPayment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verify.data.success) {
              alert("payment successful!");
            }
          } catch (err) {
            console.log("error", err.response?.data);
            console.log(err);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  return (
    <div className="w-full font-medium p-4 bg-orange-500 shadow-lg text-2xl flex justify-between items-center">
      <div className="p-2 flex flex-col">
        <span className="line-through">&#8377;{props.totalOldPrice}</span>{" "}
        &#8377;{props.totalAmount}
      </div>
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
