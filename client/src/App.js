import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import DetailsFill from "./Pages/Detailsfill";
import Products from "./Pages/Products";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import UserProfile from "./Pages/Userprofile";
import FAQ from "./Pages/Frequentlyque";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details" element={<DetailsFill />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
