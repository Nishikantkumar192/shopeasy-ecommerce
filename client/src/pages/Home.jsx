import { useEffect,useContext } from "react"
import NoteContext from "../context/NoteContext"
import DisplayProduct from "./DisplayProduct";
import SearchBar from "../components/SearchBar";
const Home = () => {
  const context=useContext(NoteContext);
  const {getProducts,products,loading}=context;
  useEffect(()=>{
    getProducts();
  },[])

  if(loading){
    return(
      <div className="bg-[url(/images/offlineImage.jpeg)] z-50 bg-cover bg-center min-h-screen">
      </div>
    )
  }

  return (
    <>
    <SearchBar/>
    <div className="flex flex-wrap justify-center gap-8 overflow-y-auto p-8 bg-gray-450 ">
      {products.map((item)=>{
        return <DisplayProduct item={item} key={item._id}/>
      })}
    </div>
    </>
  )
}

export default Home
