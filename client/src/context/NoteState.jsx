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
  const [specificItem, setSpecificItem] = useState(null);
  const [addDelete, setAddDelete] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartHistory, setCartHistory] = useState([]);
  useEffect(() => {
    isValid();
    checkBackend();
  }, []);
  const checkBackend = async () => {
    try {
      const { data } = await api.get("/api/check/isWorking");
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const isValid = async () => {
    try {
      const { data } = await api.get("/api/auth/isLoggedIn");
      setIsLoggedIn(data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const addProduct = async (formData) => {
    try {
      const { data } = await api.post("/api/product/newItem", formData);
      toast.success(data.message);
      setProducts((prev) => prev.concat(data.newItem));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  //actually here in data we get the data that i am sending from backend and if i use it as const res=  then here res=res.data
  const newUser = async (url, input) => {
    try {
      const { data } = await api.post(url, input);
      setIsLoggedIn(data.user);
      navigate("/");
      toast.success(data.message);
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
      toast.success(data.message);
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

  const getSpecificDetail = async (id) => {
    try {
      const { data } = await api.post(`/api/product/getDetail/${id}`);
      setSpecificItem(data.product);
    } catch (err) {
      toast.error(err.respone?.data?.message || err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await api.delete(`/api/product/deleteItem/${id}`);
      const updateChange = products.filter((product) => product._id !== id);
      setProducts(updateChange);
      navigate("/");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const CallUpdateDetails = async (formData, id) => {
    try {
      const { data } = await api.put(
        `/api/product/updateItemInformation/${id}`,
        formData,
      );
      navigate("/");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const removeProduct = async () => {
    try {
      const { data } = await api.delete("/api/product/remove-products", {
        data: addDelete,
      }); //For POST and PUT/PATCH requests, Axios treats the second argument as the request body:
      // But for DELETE, Axios's method signature is different:
      setProducts(data.remainProduct);
    } catch (err) {
      toast.error(err.respone?.data?.message || err.message);
    }
  };
  const Add_To_Deletion = (id) => {
    setAddDelete((prev) => [...prev, id]);
  };
  const cartItems = async () => {
    try {
      const { data } = await api.get("/api/cart/cart-items");
      setCartHistory(data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const cartRemove = async (id) => {
    try {
      const { data } = await api.delete(`/api/cart/cartRemove/${id}`);
      toast.success(data.message);
      setCartHistory(data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const addToCart = async (id) => {
    navigate(`/cart-items`);
    try {
      const { data } = await api.get(`/api/cart/addToCart/${id}`);
      toast.success(data.message);
      setCartHistory(data.cartItems)
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
    getSpecificDetail,
    Add_To_Deletion,
    addDelete,
    removeProduct,
    loading,
    cartHistory,
    cartItems,
    cartRemove,
    addToCart
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
