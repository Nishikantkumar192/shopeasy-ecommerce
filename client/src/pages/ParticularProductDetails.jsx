import { useContext, useEffect, useState } from "react";
import NoteContext from "../context/NoteContext";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import DisplayReviews from "./DisplayReviews";

const ParticularProductDetails = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const { specificItem, getSpecificDetail, deleteProduct } =
    useContext(NoteContext);
  useEffect(() => {
    getSpecificDetail(id);
    getReviews();
  }, [id]);

  const addToCart = async () => {
    navigate(`/cart-items`);
    try {
      const { data } = await api.get(`/api/cart/addToCart/${id}`);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const getReviews = async () => {
    try {
      const { data } = await api.get(`/api/review/getReviews/${id}`);
      setDetails(data.reviews);
    } catch (err) {
      toast.error(err.response?.message?.data || err.message);
    }
  };
  if (!specificItem) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-3xl">😕 Product not available</h2>
        <p className="text-2xl">
          This item may have been removed or is out of stock.
        </p>
      </div>
    );
  }
  return (
    // outer div
    <div>
      <div className="flex justify-center items-center bg-gray-450 min-h-[80vh]">
        {/* product Info div */}
        <div className="bg-white max-w-5xl w-full grid md:grid-cols-2 gap-8 p-6 rounded-lg shadow-2xl m-4">
          {/* image */}
          <div className="flex justify-center items-center">
            <img
              src={specificItem?.image?.url}
              alt="product"
              className="max-h-[450px] rounded-lg hover:scale-105 transition duration-300"
            />
          </div>

          {/* details */}
          <div className="flex flex-col justify-between">
            {/* price,description ,stock */}
            <div className="">
              <p className="text-bold text-3xl text-red-400">
                {specificItem?.name}
              </p>
              <p className="text-bold text-2xl">{specificItem?.description}</p>
              {specificItem.oldPrice > specificItem.price && (
                <span
                  className={`text-bold text-xl ${specificItem.oldPrice && "line-through"}`}
                >
                  &#8377;{specificItem?.oldPrice}
                </span>
              )}{" "}
              &nbsp; &nbsp;
              <span className="text-bold text-xl">
                &#8377;{specificItem?.price}
              </span>
              {specificItem?.oldPrice > specificItem.price && (
                <p className="text-green-400">
                  Discount: {specificItem?.discount}%
                </p>
              )}
            </div>

            {/* buttons */}
            <div>
              <button
                className="bg-yellow-500 p-2 hover:opacity-80 rounded-lg text-xl m-4"
                onClick={() => addToCart()}
              >
                Add To Cart
              </button>
              <button
                className="bg-orange-400 p-2 hover:opacity-80 rounded-lg text-xl m-4"
                onClick={() => BuyNow()}
              >
                Buy Now
              </button>
              <Link
                className="bg-green-600 p-2 hover:opacity-80 px-4 rounded-lg text-xl m-4"
                to={`/updateItemInformation/${specificItem._id}`}
              >
                Update
              </Link>
              <button
                className="bg-black text-white p-2 px-4 hover:opacity-80 rounded-lg text-xl m-4"
                onClick={() => deleteProduct(specificItem._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        {/* Reviews */}
      </div>
      <div className="bg-yellow-100">
        <h1 className="text-4xl text-red-800 pl-4">Leave Your Review</h1>
        <ReviewForm id={specificItem._id} getReviews={getReviews}/>
        <div className="flex w-full p-4 flex-wrap justify-center items-center">
          {details.map((comment) => {
            return (
              <DisplayReviews
                review={comment.review}
                rating={comment.rating}
                user={comment.relatedUser}
                getReviews={getReviews}
                id={comment._id}
                key={comment._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParticularProductDetails;
