import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const ReviewForm = (props) => {
    const {id}=props;
    console.log(id);
  const [review, setReview] = useState("");
  const handleChange = (e) => {
    setReview(e.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    createReview();
    setReview("");
  }
  const createReview=async()=>{
    try{
        const {data}=await api.post(`/api/review/createReview/${id}`,review);
        toast.success(data.message);
    }catch(err){
        toast.error(err.response?.data?.message || err.message);
    }
  }
  return (
    <div className="p-8 bg-orange-500 flex flex-col">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-2xl" htmlFor="review">
            Comment
          </label>
          <br />
          <textarea
            className="bg-black text-white mt-2 mb-2 shadow-xl p-2 outline-none rounded-lg"
            name="review"
            id="review"
            placeholder="write your review..."
            value={review}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="px-4 bg-green-600 rounded-lg p-2 cursor-pointer ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
