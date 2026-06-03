import React from "react";
import { Link } from "react-router-dom";

const ShowOrder = ({ obj }) => {
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
  return (
    <Link to={`/order-related-to-user/${obj._id}`}>
      <div className="flex flex-col flex-wrap bg-white border border-red-500 m-4 p-4 hover:bg-red-100 hover:scale-110 transition-transform duration-600 overflow-hidden shadow-[0_0_5px_5px_rgba(255,255,255)]">
        <span>Owner:{obj.relatedUser.username}</span>
        <span>amount: &#8377;{obj.amount}</span>
        <span>Payment: {obj.paymentStatus}</span>
        <span>Order_date:{formatDate(obj.createdAt)}</span>
      </div>
    </Link>
  );
};

export default ShowOrder;
