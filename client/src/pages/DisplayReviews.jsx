import { MdStarBorderPurple500 } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../api/axios";

const DisplayReviews = ({review,rating,user,id,getReviews}) => {
  const DeleteReview=async()=>{
    try{
      const {data}=await api.delete(`/api/review/deleteReview/${id}`);
      toast.success(data.message);
      getReviews();
    }catch(err){
      toast.error(err.response?.data?.message || err.message);
    }
  }
  return (
      <div className="bg-yellow-900 px-4 gap-4 m-2 rounded-lg p-4 max-w-[300px]">
        <p className="text-bold text-2xl underline">@{user.username}</p>
        <p className="flex flex-wrap">
          {Array.from({ length: rating }).map((_, i) => (
            <span className="text-yellow-400 text-xl" key={i}><MdStarBorderPurple500/></span>
          ))}
        </p>
        <p className="text-xl text-white">{review}</p>
      <button className="bg-black text-white px-4 py-1 rounded-lg hover:opacity-75 hover:underline cursor-pointer mt-2" onClick={DeleteReview}>Delete</button>
      </div>
  );
};

export default DisplayReviews;
