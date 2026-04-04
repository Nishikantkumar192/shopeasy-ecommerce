import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
    const navigate=useNavigate();
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch=()=>{
    if(!search) return;
    navigate(`/filter-products?search=${encodeURIComponent(search)}`);
  }
  return (
    <div className="mt-[80px] p-1 flex justify-center items-center">
        <input
          type="text"
          name="search"
          placeholder="Search Here..."
          value={search}
          onChange={handleChange}
          className="outline-2 px-2 mx-3 rounded-lg h-8"
        />
        <button className="bg-green-600 px-4 py-1 rounded-lg text-white cursor-pointer" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
