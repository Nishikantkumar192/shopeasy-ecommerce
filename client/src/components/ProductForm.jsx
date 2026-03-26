import { useContext, useState } from "react"
import "../styles/components.css"
import Button from "./Button";
import NoteContext from "../context/NoteContext";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const NewItem = (props) => {
    const navigate=useNavigate();
    const context=useContext(NoteContext);
    const {addProduct}=context;
    const initialState={
        name:"",
        description:"",
        price:"",
        image:null,      //no file selected yet
        category:"",
        brand:"",
    }
    const [item,setItem]=useState(initialState);
    const handleChange=(e)=>{
        if(e.target.name==="image"){
            setItem({
                ...item,
                image:e.target.files[0], //there may have many files in the array so take the first one that i user has stored
            })
        }else{
            setItem({
                ...item,
                [e.target.name]:e.target.value,
            })
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData(); // inbuilt js object 
        Object.keys(item).forEach((key)=>{
            if(item[key]) formData.append(key,item[key]);
        })
        addProduct(formData);
        setItem(initialState);
    }
  return (
    <div className="bg-gray-600 min-h-screen flex flex-col items-center pt-[80px]">
      <div className="bg-pink-400 max-w-[400px] p-4 m-4 rounded-lg relative">
      <h1 className="text-white font-bold text-4xl ">{props.heading}</h1>

        <form className="form-inputs" onSubmit={handleSubmit} encType="multipart/form-data">
        <RxCrossCircled className="w-[30px] h-[30px] cursor-pointer absolute top-6 right-2" onClick={()=>navigate("/")}/>
                <label className="font-bold" htmlFor="name">Product name</label>
            <div>
                <input type="text" placeholder="Enter product name" id="name" name="name" value={item.name} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="description">Description</label>
            <div>
                <input type="text" placeholder="Enter the description" id="description" name="description" value={item.description} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="price">Price</label>
            <div>
                <input type="number" placeholder="Enter the price" id="price" name="price" min="0" value={item.price} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="image">Product-Image</label>
            <div>
                <input type="file" placeholder="choose the image" id="image" name="image" onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="category">Category</label>
            <div>
                <input type="text" placeholder="category" id="category" name="category" value={item.category} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="brand">Product-Brand</label>
            <div>
                <input type="text" placeholder="Brand" id="brand" name="brand" value={item.brand} onChange={handleChange} required/>
            </div><br />
            <Button work={props.work}/>
        </form>
      </div>
    </div>
  )
}

export default NewItem
