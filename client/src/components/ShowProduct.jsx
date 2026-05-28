import { Link } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const ShowProduct = ({ item, quantity, updatedAt }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const cartRemove = () => {
      try{
        const { data } = api.delete(`/api/cart/cartRemove/${item?._id}`);
        toast.success(data.message);
      }catch(err){
        toast.error(err.response?.data?.message || err.message);
      }
    };
    remove -
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        cartRemove();
      });
  };
  return (
    <Link to={`/specificItem/${item?._id}`}>
      <div className="bg-white rounded-lg w-80 shadow-2xl hover:opacity-90 p-4">
        <div className="flex justify-center items-center overflow-hidden">
          <img
            src={item?.image?.url}
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
          {quantity && (
            <p className="text-xl text-red-400">Quantity: {quantity}</p>
          )}
          {updatedAt && <span>UpdatedAt: {formatDate(updatedAt)}</span>}
        </div>
        {quantity && (
          <div
            id="remove-btn"
            className="bg-black text-white px-4 py-2 text-center rounded-md cursor-pointer"
          >
            Remove
          </div>
        )}
      </div>
    </Link>
  );
};

export default ShowProduct;
