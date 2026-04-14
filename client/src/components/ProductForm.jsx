import { useContext, useState, useEffect } from "react";
import "../styles/components.css";
import Button from "./Button";
import NoteContext from "../context/NoteContext";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Newdetails = (props) => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { addProduct, CallUpdateDetails } = context;

  useEffect(() => {
    if (props.type === "edit" && props.info) {
      setDetails({
        name: props.info.name || "",
        description: props.info.description || "",
        oldPrice:props.info.oldPrice || "",
        price: props.info.price || "",
        discount:props.info.discount || "",
        image: null,
        category: props.info.category || "",
        brand: props.info.brand || "",
      });
    }
  }, [props.info]);

  const initialState = {
    name: "",
    description: "",
    oldPrice:"",
    price: "",
    discount:"",
    image: null, //no file selected yet
    category: "",
    brand: "",
  };
  const [details, setDetails] = useState(initialState);
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setDetails({
        ...details,
        image: e.target.files[0], //there may have many files in the array so take the first one that i user has stored
      });
    } else {
      setDetails({
        ...details,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(); // inbuilt js object
    Object.keys(details).forEach((key) => {
      if (details[key]) formData.append(key, details[key]);
    });
    if (props.type === "add") addProduct(formData);
    else CallUpdateDetails(formData, props.id);
    setDetails(initialState);
  };
  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-900 min-h-screen flex flex-col justify-center items-center overflow-y-auto pt-[80px] p-4">
      <h1 className="text-white font-bold text-3xl">{props.heading}</h1>
      <div className="bg-white/10 backdrop-blur-lg max-w-[550px] w-full p-4 m-4 rounded-lg relative">
        <form
          className="form-inputs"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <RxCrossCircled
            className="w-[30px] h-[30px] cursor-pointer absolute top-5 right-4 hover:text-red-400"
            onClick={() => navigate("/")}
          />{" "}
          <br />
          <div>
            <label className="font-bold" htmlFor="name">
              Product name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              id="name"
              name="name"
              value={details.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-bold" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter the description"
              id="description"
              name="description"
              value={details.description}
              onChange={handleChange}
              required
            />
          </div>
        <div>
            <label className="font-bold" htmlFor="oldPrice">
              Old-price
            </label>
            <input
              type="number"
              placeholder="Enter the Old-price"
              id="oldPrice"
              name="oldPrice"
              min="0"
              value={details.oldPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-bold" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter the new-price"
              id="price"
              name="price"
              min="0"
              value={details.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-bold" htmlFor="image">
              Product-Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              required={props.type !== "edit"}
              className="w-full file:bg-pink-700 flex justify-center items-center file:px-4 file:py-2 file:rounded-lg mt-1 file:mr-3 file:border-0 cursor-pointer"
            />
          </div> 
          <div>
            <label className="font-bold" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              placeholder="category"
              id="category"
              name="category"
              value={details.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-bold" htmlFor="brand">
              Product-Brand
            </label>
            <input
              type="text"
              placeholder="Brand"
              id="brand"
              name="brand"
              value={details.brand}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <Button work={props.work} />
        </form>
      </div>
    </div>
  );
};

export default Newdetails;
