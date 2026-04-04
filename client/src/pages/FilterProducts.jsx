import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import ShowProduct from "../components/ShowProduct";

const FilterProducts = () => {
    const [products,setProducts]=useState([]);
    const location=useLocation();
    // console.log(location);
    //location is an object in which search exits which tells what the user is passing in search.
    const query=new URLSearchParams(location.search).get("search");
    // new URLSearchParams convets "?search=hat" to an object which will contain
    // {  search:hat } then .get("search") will extract the value (hat) from search and save in query.

    useEffect(()=>{
        if(query) filterProducts();
    },[query]);
    const filterProducts=async()=>{
        try{
            const {data}=await api.post(`/api/product/filter-products?search=${query}`);
            setProducts(data);
        }catch(err){
            toast.error(err.response?.data?.message);
        }
    }

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen pt-[80px] gap-4">
        {products.map((item)=>{
            return <ShowProduct item={item} key={item._id}/>
        })}
    </div>
  )
}

export default FilterProducts
