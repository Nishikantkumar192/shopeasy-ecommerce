import { Link } from "react-router-dom";

const DisplayProduct = ({ item }) => {
  return (
    <Link to={`/specificItem/${item._id}`}>
      <div className="bg-white rounded-lg w-80">
        <div className="flex justify-center items-center overflow-hidden">
          <img src={item?.image?.url} alt="product" className="w-full h-44 object-cover hover:scale-110 transition duration-300 rounded-lg" />
        </div>
        <div className="p-3">
          <span className="line-through text-xl">&#8377;{item?.oldPrice}</span> &nbsp; &nbsp; 
          <span className="text-xl">&#8377;{item?.price}</span>
          <p className="text-2xl text-bold">{item?.name}</p>
          <p className="text-green-400 text-bold text-xl">Discount: {item?.discount}%</p>
          <p className={`text-xl ${item.isAvailable?"text-green-600":"text-red-500"}`}>{item?.isAvailable?"In Stock":"Out of Stock"}</p>
        </div>
      </div>
    </Link>
  );
};

export default DisplayProduct;
