import { useEffect,useContext } from "react"
import NoteContext from "../context/NoteContext"
import DisplayProduct from "./DisplayProduct";
import SearchBar from "../components/SearchBar";
const Home = () => {
  const context=useContext(NoteContext);
  const {getProducts,products}=context;
  useEffect(()=>{
    getProducts();
  },[])
  return (
    <>
    <SearchBar/>
    <div className="flex flex-wrap justify-center gap-8 overflow-y-auto p-8 bg-gray-450 h-screen">
      {products.map((item)=>{
        return <DisplayProduct item={item} key={item._id}/>
      })}
    </div>
    </>
  )
}

export default Home
