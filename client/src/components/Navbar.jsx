import {Link} from "react-router-dom";
import { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const Navbar = () => {
  const context=useContext(NoteContext);
  const [user,setUser]=useState(false);
  const {LogoutUser,isLoggedIn}=context;
  const handleDropdown=()=>{
    if(user) setUser(false);
    else setUser(true);
  }
  return (
    <div className="bg-black text-gray-400 fixed top-0 w-full h-[50px] flex justify-between items-center z-1">
      <div>
          <Link className="ml-[10px] text-lg hover:text-white" to="/">Home</Link> 
          {isLoggedIn && <Link className="ml-[10px] hover:text-white" to="/addItem">AddItem</Link>}
          <Link className="ml-[10px]" to={"/cart-items"}>Cart Items</Link>
      </div>
      <div className="relative">
        {!isLoggedIn?<Link className="ml-[10px] mr-[10px] hover:text-white" to="/log-in">Log-in</Link>
        :<div className="rounded-full flex justify-center items-center cursor-pointer h-[30px] w-[30px] bg-white mr-8" onClick={()=>handleDropdown()}>{isLoggedIn.username[0]}</div> }
        {user && <div className="absolute top-12 right-4 bg-gray-300 p-4 ml-2 rounded-sm shadow-2xl">
          <p className="text-xl text-black">{isLoggedIn?.username}</p>
          <p className="text-lg text-black">{isLoggedIn?.email}</p>
          <span className="mr-[10px] cursor-pointer text-xl text-black" onClick={()=>{LogoutUser();handleDropdown()}}>Logout</span>
        </div>}
        </div>        
    </div>
  )
}
export default Navbar
