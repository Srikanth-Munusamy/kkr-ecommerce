import React from "react";
import Navbar from "../Components/Navbar";
import Featureditem from "../Components/Featureditem";
import FAQ from "../Components/brands";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Categories from "../Components/Categories";
import WhyShopAndBrands from "../Components/brands";

const Home = () => {
  return (
    <div>
      <Hero />
      <Featureditem />
      <Categories />
      <WhyShopAndBrands />
    </div>
  );
};

export default Home;
