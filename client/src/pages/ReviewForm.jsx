import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const ReviewForm = (props) => {
  const { id } = props;
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
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  return (
    <div className="p-8 bg-orange-900 flex flex-col">
      <form onSubmit={handleSubmit}>
        <StarRating
          rating={info.rating}
          setRating={(value) => setInfo({ ...info, rating: value })}
        />
        <textarea
          className="bg-black text-white mt-2 mb-2 shadow-xl p-2 outline-none rounded-lg"
          name="review"
          id="review"
          placeholder="write your review..."
          value={info.review}
          onChange={handleChange}
          required
        ></textarea><br />
        <button className="px-4 bg-green-600 rounded-lg p-2 cursor-pointer ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
