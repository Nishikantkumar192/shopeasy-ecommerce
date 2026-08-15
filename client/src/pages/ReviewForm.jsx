import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const ReviewForm = (props) => {
  const { id,setDetails,details } = props;
  const initialState = {
    review: "",
    rating: 1,
  };
  const [info, setInfo] = useState(initialState);
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createReview();
    setInfo(initialState);
  };
  const createReview = async () => {
    try {
      const { data } = await api.post(`/api/review/createReview/${id}`, info);
      setDetails(details.concat(data.newReview));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
return (
  <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
    <div className="w-full">
      <form onSubmit={handleSubmit}>

        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Leave Your Review
        </h2>

        <StarRating
          rating={info.rating}
          setRating={(value) => setInfo({ ...info, rating: value })}
        />

        <textarea
          className="w-full mt-4 mb-4 bg-gray-50 text-gray-800
                     border border-gray-300 rounded-xl
                     p-4 outline-none resize-none
                     focus:ring-2 focus:ring-yellow-400
                     focus:border-yellow-400
                     transition duration-200"
          name="review"
          id="review"
          rows={6}
          placeholder="Write your review..."
          value={info.review}
          onChange={handleChange}
          required
        ></textarea>

        <button
          className="px-6 py-2.5 bg-yellow-500 text-white
                     font-medium rounded-lg
                     hover:bg-yellow-600
                     active:scale-95
                     transition-all duration-200
                     cursor-pointer shadow-sm"
        >
          Submit Review
        </button>

      </form>
    </div>
  </div>
);
};

export default ReviewForm;
