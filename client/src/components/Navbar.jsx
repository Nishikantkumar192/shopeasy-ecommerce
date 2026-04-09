import {Link} from "react-router-dom";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";

const Navbar = () => {
  const context=useContext(NoteContext);
  const {LogoutUser,isLoggedIn}=context;
  return (
    <div className="bg-black text-gray-400 fixed top-0 w-full h-[50px] flex justify-between items-center z-1">
      <div>
          <Link className="ml-[10px] text-lg hover:text-white" to="/">Home</Link> 
          {isLoggedIn && <Link className="ml-[10px] hover:text-white" to="/addItem">AddItem</Link>}
          <Link className="ml-[10px]" to={"/cart-items"}>Cart Items</Link>
      </div>
      <div>
        {!isLoggedIn?<Link className="ml-[10px] mr-[10px] hover:text-white" to="/log-in">Log-in</Link>
        :<div className="rounded-full flex justify-center items-center cursor-pointer h-[30px] w-[30px] bg-white mr-8">{isLoggedIn.username[0]}</div> }
        {/* // :<span className="mr-[10px] cursor-pointer" onClick={()=>LogoutUser()}>Logout</span>} */}
        </div>        
    </div>
  )
}
export default Navbar
