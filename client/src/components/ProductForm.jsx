import { useContext, useState,useEffect } from "react"
import "../styles/components.css"
import Button from "./Button";
import NoteContext from "../context/NoteContext";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Newdetails = (props) => {
    const navigate=useNavigate();
    const context=useContext(NoteContext);
    const {addProduct,CallUpdateDetails}=context;

    useEffect(() => {
  if (props.type === "edit" && props.info) {
    setDetails({
      name: props.info.name || "",
      description: props.info.description || "",
      price: props.info.price || "",
      image: null,
      category: props.info.category || "",
      brand: props.info.brand || "",
    });
  }
}, [props.info]);

    const initialState={
        name:"",
        description:"",
        price:"",
        image:null,      //no file selected yet
        category:"",
        brand:"",
    }
    const [details,setDetails]=useState(initialState);
    const handleChange=(e)=>{
        if(e.target.name==="image"){
            setDetails({
                ...details,
                image:e.target.files[0], //there may have many files in the array so take the first one that i user has stored
            })
        }else{
            setDetails({
                ...details,
                [e.target.name]:e.target.value,
            })
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData(); // inbuilt js object 
        Object.keys(details).forEach((key)=>{
            if(details[key]) formData.append(key,details[key]);
        })
        if(props.type==="add") addProduct(formData);
        else CallUpdateDetails(formData,props.id);
        setDetails(initialState);
    }
  return (
    <div className="bg-gray-600 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-white font-bold text-3xl">{props.heading}</h1>
      <div className="bg-pink-400 max-w-[400px] p-4 m-4 rounded-lg relative">

        <form className="form-inputs" onSubmit={handleSubmit} encType="multipart/form-data">
        <RxCrossCircled className="w-[30px] h-[30px] cursor-pointer absolute top-2 right-2" onClick={()=>navigate("/")}/> <br />
                <label className="font-bold" htmlFor="name">Product name</label>
            <div>
                <input type="text" placeholder="Enter product name" id="name" name="name" value={details.name} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="description">Description</label>
            <div>
                <input type="text" placeholder="Enter the description" id="description" name="description" value={details.description} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="price">Price</label>
            <div>
                <input type="number" placeholder="Enter the price" id="price" name="price" min="0" value={details.price} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="image">Product-Image</label>
            <div>
                <input type="file" id="image" name="image" onChange={handleChange} required={props.type!=="edit"}/>
            </div>
                <label className="font-bold" htmlFor="category">Category</label>
            <div>
                <input type="text" placeholder="category" id="category" name="category" value={details.category} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="brand">Product-Brand</label>
            <div>
                <input type="text" placeholder="Brand" id="brand" name="brand" value={details.brand} onChange={handleChange} required/>
            </div><br />
            <Button work={props.work}/>
        </form>
      </div>
    </div>
  )
}

export default Newdetails
