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
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 bg-gray-450 min-h-screen pt-[80px]">
      {items?.map((product)=>{
        return <ShowProduct item={product.relatedProduct} quantity={product.quantity} updatedAt={product.updatedAt} key={product._id}/>
      })}
    </div>
  )
}

export default CartItems
