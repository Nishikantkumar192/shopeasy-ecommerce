import React from "react";

const PriceDetails = (props) => {
  return (
    <div className="m-4 bg-gray-200 max-w-[500px] flex flex-col text-2xl p-5 ">
      <div className="flex justify-between mt-2 mb-2">
        <span className="underline mr-4">MRP (includes all taxes)</span>
        <span className="text-green-700">&#8377;{props.totalAmount}</span>
      </div>
      <select className="mt-2">
        <option value="">Fees</option>
        <option disabled value="">platForm Fee - &#8377;{props.platFormCharge}</option>
        <option disabled value="">
          Delivary charge - &#8377;{props.delivaryCharge}
        </option>
      </select>

    </div>
  );
};

export default PriceDetails;
