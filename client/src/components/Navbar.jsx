import {Link} from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-pink-800 fixed top-0 w-full h-[50px] flex items-center">
        <Link className="text-lg text-black" to="/">Home</Link> 
        <Link className="ml-[10px]" to="/addItem">AddItem</Link>
        <Link className="ml-[10px]" to="/editItem">EditItem-Details</Link>
    </div>
  )
}
export default Navbar
