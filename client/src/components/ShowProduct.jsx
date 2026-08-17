import { Link } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";

const ShowProduct = ({ item, quantity, updatedAt }) => {
  const context = useContext(NoteContext);
  const { Add_To_Deletion, isLoggedIn,cartRemove } = context;
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
    <Link to={`/specificItem/${item?._id}`}>
      <div className="bg-white rounded-lg w-80 shadow-2xl hover:opacity-90 p-4">
        <div className="flex justify-center items-center overflow-hidden">
          <img
            src={item?.images[0]?.url}
            alt="product"
            className="w-full h-44 object-cover hover:scale-110 transition duration-300 rounded-lg"
          />
        </div>
        <div className="p-3">
          {item?.oldPrice > item?.price && (
            <span className="line-through text-xl">
              &#8377;{item?.oldPrice}
            </span>
          )}{" "}
          <span className="text-xl">&#8377;{item?.price}</span>
          <p className="text-2xl text-bold">{item?.name}</p>
          {item?.oldPrice > item?.price && (
            <p className="text-green-400 text-bold text-xl">
              Discount:{" "}
              {Math.floor(((item.oldPrice - item.price) / item.oldPrice) * 100)}
              %
            </p>
          )}
          <p
            className={`text-xl ${item?.isAvailable ? "text-green-600" : "text-red-500"}`}
          >
            {item?.isAvailable ? "In Stock ✅" : "Out of Stock ❌"}
          </p>
          {isLoggedIn && isLoggedIn?.role === "admin" && (
            <p
              className="bg-black text-white text-center w-full text-xl py-2 mt-4 hover:bg-gray-600 hover:text-red-800"
              onClick={(e) => {
                (Add_To_Deletion(item?._id),
                  e.stopPropagation(),
                  e.preventDefault());
              }}
            >
              Add to delete
            </p>
          )}
          {quantity && (
            <p className="text-xl text-red-400">Quantity: {quantity}</p>
          )}
          {updatedAt && <span>UpdatedAt: {formatDate(updatedAt)}</span>}
        </div>
        {quantity && (
          <button
            onClick={(e) => {
              (e.preventDefault(), e.stopPropagation(), cartRemove(item?._id));
            }}
            className="bg-black text-white px-4 py-2 text-center rounded-md cursor-pointer"
          >
            Remove
          </button>
        )}
      </div>
    </Link>
  );
};

export default ShowProduct;
