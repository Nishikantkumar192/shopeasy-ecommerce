import { MdStarBorderPurple500 } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../api/axios";

const DisplayReviews = ({review,rating,username,id,setDetails,details}) => {
  const DeleteReview=async()=>{
    try{
      const {data}=await api.delete(`/api/review/deleteReview/${id}`);
      const filterReview=details.filter((detail)=>detail._id!==id);
      setDetails(filterReview);
      toast.success(data.message);
    }catch(err){
      toast.error(err.response?.data?.message || err.message);
    }
  }
return (
  <div
    className="w-full max-w-md bg-white
               border border-gray-200
               rounded-2xl p-5
               shadow-md
               hover:shadow-xl
               hover:-translate-y-1
               transition-all duration-200"
  >
    <p className="text-lg font-semibold text-gray-800 underline mb-2">
      @{username}
    </p>

    <p className="flex gap-0.5 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <span
          className="text-yellow-400 text-xl"
          key={i}
        >
          <MdStarBorderPurple500 />
        </span>
      ))}
    </p>

    <p className="text-base text-gray-600 leading-relaxed">
      {review}
    </p>

    <button
      className="mt-4 bg-red-50 text-red-600
                 border border-red-200
                 px-4 py-2 rounded-lg
                 font-medium
                 hover:bg-red-600 hover:text-white
                 transition-all duration-200
                 cursor-pointer"
      onClick={DeleteReview}
    >
      Delete
    </button>
  </div>
);
};

export default DisplayReviews;
