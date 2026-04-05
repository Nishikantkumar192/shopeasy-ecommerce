import { MdStarBorderPurple500 } from "react-icons/md";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={`text-2xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          <MdStarBorderPurple500/>
        </span>
      ))}
    </div>
  );
};

export default StarRating;