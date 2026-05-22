import { useEffect,useState } from "react"
import api from "../api/axios";
import { toast } from "react-toastify";
import ShowProduct from "../components/ShowProduct";

const CartItems = () => {
    const [items,setItems]=useState([]);
    useEffect(()=>{
        cartItems();
    },[]);
    const cartItems=async()=>{
        try{
            const {data}=await api.get("/api/cart/cart-items");
            setItems(data);
        }catch(err){
            toast.error(err.response?.data?.message || err.message);
        }
    }
  if (!items) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-3xl">😕 Empty Cart</h2>
      </div>
    );
  }
  const totalAmount = items?.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
  return (
    <div>
    <div className="flex flex-wrap justify-center items-center gap-8 bg-gray-450 min-h-screen">
      {items.map((product)=>{
        return <ShowProduct item={product.relatedProduct?product.relatedProduct:product.guestId}  quantity={product.quantity} updatedAt={product.updatedAt} key={product._id}/>
      })}
    </div>
    <p className="text-5xl">Total amount:{totalAmount}</p>
    </div>
  )
}

export default CartItems
