import NoteContext from "./NoteContext"
import axios from "axios";
import {toast } from 'react-toastify';

const NoteState = (props) => {
    const BackendUrl=import.meta.env.VITE_BACKEND_URL;
    const addProduct= async(req,res)=>{
        try{
            const {data}=await axios.post(BackendUrl+"/api/product/newItem");
            toast.success("product added succcessfully");
        }catch(err){
            toast.error(err.message);
        }
    }
  return (
    <div>
      <NoteContext.Provider value={addProduct}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
