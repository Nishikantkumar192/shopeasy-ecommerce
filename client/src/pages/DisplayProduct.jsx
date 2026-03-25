
const DisplayProduct = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300 w-64">
      
      <img
        src={item?.image?.url}
        alt="product"
        className="w-full h-40 object-cover rounded-xl"
      />

      <h3 className="text-lg font-semibold mt-3 text-gray-800">
        {item.name}
      </h3>

      <p className="text-gray-600 mt-1">
        ₹{item.price}
      </p>

      <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Add to Cart
      </button>

    </div>
  );
};

export default DisplayProduct;
