import { useContext } from "react";
import NoteContext from "../context/NoteContext";

const DisplayProduct = ({ item }) => {
  const context=useContext(NoteContext);
  const {getItemInformation,deleteProduct}=context;
  return (
    <div className="relative flex flex-col bg-white rounded-lg hover:opacity-85 w-64">
      
      <img
        src={item?.image?.url}
        alt="product"
        className="w-full h-40 object-cover rounded-t-lg"
      />

      <h3 className="text-lg font-semibold mt-3 pl-4 text-gray-800">
        {item.name}
      </h3>

      <p className="text-gray-600 mt-1 pl-4">
        ₹{item.price}
      </p>

      <p className="text-gray-600 mt-1 pl-4">
        Brand: {item.brand}
      </p>

    <div className="p-4"><button className="underline cursor-pointer" onClick={()=>getItemInformation(item._id)}>Edit</button> &nbsp;&nbsp;&nbsp;
          <button className="underline cursor-pointer" onClick={()=>deleteProduct(item._id)}>Delete</button></div>
    </div>
  );
};

export default DisplayProduct;
