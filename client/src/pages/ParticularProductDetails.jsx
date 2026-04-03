import { useContext } from "react"
import NoteContext from "../context/NoteContext"

const ParticularProductDetails = () => {
  const { specificItem } = useContext(NoteContext);

  if (!specificItem) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    // outer div
    <div className="flex justify-center items-center bg-gray-450 min-h-screen">

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
            <button className="bg-yellow-500 p-2 hover:opacity-80 rounded-lg text-xl">Add To Cart</button>&nbsp; &nbsp;
            <button className="bg-orange-400 p-2 hover:opacity-80 rounded-lg text-xl">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParticularProductDetails