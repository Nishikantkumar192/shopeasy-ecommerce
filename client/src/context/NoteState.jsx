import NoteContext from "./NoteContext";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NoteState = (props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [specificItem,setSpecificItem]=useState(null);

  useEffect(() => {
    isValid();
  }, []);

  const isValid = async () => {
    try {
      const { data } = await api.get("/api/auth/isLoggedIn");
      if (data.success) {
        setIsLoggedIn(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const addProduct = async (formData) => {
    try {
      const { data } = await api.post("/api/product/newItem", formData);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  //actually here in data we get the data that i am sending from backend and if i use it as const res=  then here res=res.data
  const newUser = async (url, input) => {
    try {
      const { data } = await api.post(url, input);
      if (data.success) {
        setIsLoggedIn(data.user);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);

      //err.response?.data?.message      // HOW IT WORKS DISCUSSED BELOW
      //err = {
      //   message: "Request failed with status code 404",
      //   response: {
      //     data: {
      //       message: "Not Found"
      //     },
      //     status: 404,
      //     headers: {...}
      //   },
      //   request: {...},
      //   config: {...}
      // }
    }
  };
  const LogoutUser = async () => {
    setIsLoggedIn(false);
    navigate("/");
    try {
      const { data } = await api.get("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const getProducts = async () => {
    try {
      const { data } = await api.get("/api/product/getProducts");
      setProducts(data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const getSpecificDetail=async(id)=>{
      try{
        const {data}=await api.get(`/api/product/getDetail/${id}`);
        setSpecificItem(data.product);
      }catch(err){
        toast.error(err.respone?.data?.message || err.message);
      }
    }

  const deleteProduct = async (id) => {
    try {
      const { data } = await api.get(`/api/product/deleteItem/${id}`);
      if (data.success === true) {
        const updateChange = products.filter((product) => product._id !== id);
        setProducts(updateChange);
        navigate("/");
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const CallUpdateDetails = async (formData, id) => {
    try {
      const { data } = await api.post(
        `/api/product/updateItemInformation/${id}`,
        formData,
      );
      if(data.success){
        navigate("/");
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const values = {
    addProduct,
    newUser,
    getProducts,
    products,
    deleteProduct,
    LogoutUser,
    CallUpdateDetails,
    isLoggedIn,
    specificItem,
    getSpecificDetail
  };
  return (
    <div>
      <NoteContext.Provider value={values}>
        {props.children}
      </NoteContext.Provider>
    </div>
  );
};

export default NoteState;
