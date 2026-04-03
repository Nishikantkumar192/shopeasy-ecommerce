import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductItem from "./components/ProductForm";
import { ToastContainer } from "react-toastify";
import NoteState from "./context/NoteState";
import AuthForm from "./components/AuthForm";
import UpdateProductDetails from "./pages/UpdateProductDetails";
import ParticularProductDetails from "./pages/ParticularProductDetails";

function App() {
  return (
    <Router>
      <NoteState>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/addItem"
            element={
              <ProductItem
                heading="Add new product"
                type="add"
                work="Add product"
              />
            }
          />
          <Route
            exact
            path="/UpdateProductDetails/:id"
            element={<UpdateProductDetails />}
          />
          <Route exact path="/log-in" element={<AuthForm />} />
          <Route exact path="/sign-up" element={<AuthForm />} />
          <Route exact path="/specificItem" element={<ParticularProductDetails/>}/>
        </Routes>
      </NoteState>
    </Router>
  );
}

export default App;
