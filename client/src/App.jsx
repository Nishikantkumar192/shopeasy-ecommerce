import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductItem from "./components/ProductForm";
import { ToastContainer} from 'react-toastify';
import NoteState from "./context/NoteState";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <ToastContainer/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/addItem" element={<ProductItem heading="Add new item" work="Add product"/>}/>
          <Route exact path="/log-in" element={<AuthForm/>}/>
          <Route exact path="/sign-up" element={<AuthForm/>}/>
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
