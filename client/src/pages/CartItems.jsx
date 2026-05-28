import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import ShowProduct from "../components/ShowProduct";
import Payment from "./Payment";
import PriceDetails from "./PriceDetails";
const CartItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    cartItems();
  }, []);
  const cartItems = async () => {
    try {
      const { data } = await api.get("/api/cart/cart-items");
      setItems(data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-5xl">😕 Empty Cart</h2>
      </div>
    );
  }
  const totalOldPrice = items.reduce(
    (total, item) => total + (item.relatedProduct?.oldPrice || 0) * item.quantity,
    0,
  );
  const totalAmount = items.reduce(
    (total, item) => total + (item.relatedProduct?.price || 0) * item.quantity,
    0,
  );
  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-8 bg-gray-450 mt-20">
        {items.map((product) => {
          return (
            <ShowProduct
              item={product.relatedProduct}
              quantity={product.quantity}
              updatedAt={product.updatedAt}
              key={product._id}
            />
          );
        })}
      </div>
      <PriceDetails totalAmount={totalAmount} platFormCharge={11} delivaryCharge={50} totalOldPrice={totalOldPrice}/>
      {totalAmount != 0 && (
        <Payment totalAmount={totalAmount} totalOldPrice={totalOldPrice}/>
      )}
    </div>
  );
};

export default CartItems;
