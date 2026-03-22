import {Link} from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-black text-gray-400 fixed top-0 w-full h-[50px] flex justify-between items-center">
      <div>
          <Link className="ml-[10px] text-lg hover:text-white" to="/">Home</Link> 
          <Link className="ml-[10px] hover:text-white" to="/addItem">AddItem</Link>
      </div>
        <Link className="ml-[10px] mr-[10px] hover:text-white" to="/log-in">Log-in&rarr;</Link>
    </div>
  )
}
export default Navbar
