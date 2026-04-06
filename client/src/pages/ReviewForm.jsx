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
    <div className="p-8 bg-orange-900 flex flex-col max-w-[500px] justify-center items-center rounded-lg shadow-2xl m-4">
    <div className="w-full p-4">
      <form onSubmit={handleSubmit}>
        <StarRating
          rating={info.rating}
          setRating={(value) => setInfo({ ...info, rating: value })}
        />
        <textarea
          className="bg-black text-white mt-2 mb-2 shadow-xl p-2 outline-none rounded-lg w-full max-w-[400px]"
          name="review"
          id="review"
          rows={6}
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
    </div>
  );
};

export default ReviewForm;
