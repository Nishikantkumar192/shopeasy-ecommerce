import { useContext, useState } from "react"
import "../styles/components.css"
import Button from "./Button";
import NoteContext from "../context/NoteContext";

const NewItem = (props) => {
    const context=useContext(NoteContext);
    const {addProduct}=context;
    const initialState={
        name:"",
        description:"",
        price:"",
        image:"",
        category:"",
        brand:"",
    }
    const [item,setItem]=useState(initialState);
    const handleChange=(e)=>{
        setItem({
            ...item,
            [e.target.name]:e.target.value,
        })
    }
    const handleSubmit=()=>{
        e.preventDefault();
        console.log("its working");
        addProduct(item);
        console.log("successfully");
        setItem(initialState);
    }
  return (
    <div className="bg-yellow-900 min-h-screen flex flex-col items-center pt-[100px]">
      <h1 className="text-black text-3xl">{props.heading}</h1>
      <div className="bg-pink-400 max-w-[400px] p-4 m-4 rounded-lg">
        <form className="form-inputs" onSubmit={handleSubmit} encType="multipart/form-data">
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
                <input type="text" placeholder="Enter the price" id="price" name="price" value={item.price} onChange={handleChange} required/>
            </div>
                <label className="font-bold" htmlFor="image">Product-Image</label>
            <div>
                <input type="file" placeholder="choose the image" id="image" name="image" value={item.image} onChange={handleChange} required/>
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
