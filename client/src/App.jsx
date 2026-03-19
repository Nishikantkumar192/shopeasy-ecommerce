import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductItem from "./components/ProductForm";
import { ToastContainer} from 'react-toastify';
import NoteState from "./context/NoteState";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <ToastContainer/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/addItem" element={<ProductItem heading="Add new item" work="Add product"/>}/>
          <Route exact path="/editItem" element={<ProductItem heading="Edit the Details" work="Edit product"/>}/>
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
