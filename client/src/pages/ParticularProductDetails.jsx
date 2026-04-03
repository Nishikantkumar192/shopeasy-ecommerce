import { useContext,useEffect } from "react"
import NoteContext from "../context/NoteContext"
import { toast } from "react-toastify";
import api from "../api/axios";
import { useParams } from "react-router-dom";
<<<<<<< HEAD

const ParticularProductDetails = () => {
  const {id}=useParams();
  const { specificItem,getSpecificDetail } = useContext(NoteContext);
=======
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ParticularProductDetails = () => {
  const navigate=useNavigate();
  const {id}=useParams();
  const { specificItem,getSpecificDetail,deleteProduct } = useContext(NoteContext);
>>>>>>> 3a7ff32 (feat: enhance product listing UI and implement add-to-cart functionality)
  useEffect(()=>{
    getSpecificDetail(id);
  })

  const addToCart=async()=>{
<<<<<<< HEAD
=======
    navigate(`/cart-items/${id}`);
>>>>>>> 3a7ff32 (feat: enhance product listing UI and implement add-to-cart functionality)
    try{
      const {data}=await api.post(`/api/cart/addToCart/${specificItem._id}`);
      toast.success(data.message);
    }catch(err){
      toast.error(err.response?.data?.message || err.message);
    }
  }
  if (!specificItem) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    // outer div
    <div className="flex justify-center items-center bg-gray-450 min-h-screen p-4">

      {/* product Info div */}
      <div className="bg-white max-w-5xl w-full grid md:grid-cols-2 gap-8 p-6 rounded-lg shadow-2xl">

        {/* image */}
        <div className="flex justify-center items-center">
          <img src={specificItem?.image?.url} alt="product" className="max-h-[450px] rounded-lg hover:scale-105 transition duration-300" />
        </div>
         
        {/* details */}
        <div className="flex flex-col justify-between">

          {/* price,description ,stock */}
          <div className="">
            <p className="text-bold text-3xl">{specificItem?.name}</p>
            <p className="text-bold text-2xl">{specificItem?.description}</p>
            <span className={`text-bold text-xl ${specificItem.oldPrice && "line-through"}`}>&#8377;{specificItem?.oldPrice}</span> &nbsp; &nbsp;
            <span className="text-bold text-xl">&#8377;{specificItem?.price}</span>
            <p className="text-green-400">Discount: {specificItem?.discount}%</p>
          </div>

          {/* buttons */}
          <div>
<<<<<<< HEAD
            <button className="bg-yellow-500 p-2 hover:opacity-80 rounded-lg text-xl" onClick={()=>addToCart()}>Add To Cart</button>&nbsp; &nbsp;
            <button className="bg-orange-400 p-2 hover:opacity-80 rounded-lg text-xl" onClick={()=>BuyNow()}>Buy Now</button>
=======
            <button className="bg-yellow-500 p-2 hover:opacity-80 rounded-lg text-xl m-4" onClick={()=>addToCart()}>Add To Cart</button>
            <button className="bg-orange-400 p-2 hover:opacity-80 rounded-lg text-xl m-4" onClick={()=>BuyNow()}>Buy Now</button>
            <Link className="bg-green-600 p-2 hover:opacity-80 rounded-lg text-xl m-4" to={`/updateItemInformation/${specificItem._id}`}>Update Details</Link>
            <button className="bg-black text-white p-2 hover:opacity-80 rounded-lg text-xl m-4" onClick={()=>deleteProduct(specificItem._id)}>Delete product</button>      
>>>>>>> 3a7ff32 (feat: enhance product listing UI and implement add-to-cart functionality)
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParticularProductDetails