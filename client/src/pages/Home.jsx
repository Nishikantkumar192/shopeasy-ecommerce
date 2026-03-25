import { useEffect,useContext } from "react"
import NoteContext from "../context/NoteContext"
import DisplayProduct from "./DisplayProduct";
const Home = () => {
  const context=useContext(NoteContext);
  const {getProducts,products}=context;
  useEffect(()=>{
    getProducts();
  },[])
  return (
    <div className="flex flex-wrap gap-8 p-8 bg-gray-400 h-screen pt-[80px]">
      {products.map((item)=>{
        return <DisplayProduct item={item} key={item._id}/>
      })}
    </div>
  )
}

export default Home
