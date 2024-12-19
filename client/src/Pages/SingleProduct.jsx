import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Fetch the product details from the API
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://api.karthikeshrobotics.in/products/${id}`
      );
      const data = await response.json();
      if (response.ok) {
        setProduct(data);
      } else {
        console.log("Product not found!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data from localStorage
  const fetchCartData = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cartData.find((item) => item.id === parseInt(id));
    if (existingProduct) {
      setQuantity(existingProduct.quantity);
      setIsAdded(true);
    }
  };

  // Add product to cart
  const addCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cartData.findIndex(
      (item) => item.id === parseInt(id)
    );

    if (existingProductIndex >= 0) {
      cartData[existingProductIndex].quantity += quantity;
    } else {
      cartData.push({ id: parseInt(id), quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    setIsAdded(true);
  };

  // Update cart quantity
  const updateCartQuantity = (newQuantity) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cartData.findIndex(
      (item) => item.id === parseInt(id)
    );

    if (existingProductIndex >= 0) {
      cartData[existingProductIndex].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  const handleIncrement = () => {
    if (quantity < product.productStockQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (isAdded) {
        updateCartQuantity(newQuantity);
      }
    } else {
      alert("You have reached the maximum available stock for this product.");
    }
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 0; // Set quantity to 0 if it goes below 1
    setQuantity(newQuantity);
    if (isAdded && newQuantity > 0) {
      updateCartQuantity(newQuantity);
    } else {
      setIsAdded(false); // Reset isAdded state to false when quantity is 0
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCartData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full">
              {/* Main Image */}
              <img
                alt="ecommerce"
                className="w-full object-cover object-center rounded border border-gray-200 mb-4"
                src={`https://api.karthikeshrobotics.in/images/products/${product.productImages[0].filename}`}
              />

              {/* Thumbnail Images */}
              <div className="flex mt-4">
                {product.productImages.map((image, index) => (
                  <img
                    key={index}
                    alt="thumbnail"
                    className="w-20 h-20 object-cover object-center rounded border border-gray-200 mr-2 cursor-pointer"
                    src={`https://api.karthikeshrobotics.in/images/products/${image.filename}`}
                    onClick={() => {
                      // Handle click to change main image
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.productBrand} - {product.Subcategory.sub_categoryName}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.productName}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {[...Array(product.ratings)].map((_, index) => (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-3">
                    {product.reviews} Reviews
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">{product.productDescription}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button
                    className={`border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none`}
                    style={{ backgroundColor: product.productColor }}
                  ></button>
                </div>
              </div>
              <div className="flex-col">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.productDiscontPrice}
                </span>
                <span className="ml-4 line-through text-gray-600">
                  ${product.productPrice}
                </span>
                <div className="flex mt-4 items-center">
                  {!isAdded || quantity === 0 ? (
                    <button
                      onClick={addCart}
                      className="flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <button
                        onClick={handleDecrement}
                        className="flex items-center justify-center text-gray-500 border border-gray-300 bg-white rounded-l w-8 h-8 focus:outline-none"
                      >
                        -
                      </button>
                      <span className="flex items-center justify-center w-12 h-8 border-t border-b border-gray-300 bg-white">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrement}
                        className="flex items-center justify-center text-gray-500 border border-gray-300 bg-white rounded-r w-8 h-8 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  )}
                  <button className="flex ml-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                    Buy Now
                  </button>
                </div>
                <span className="ml-4 text-green-500">
                  In Stock: {product.productStockQuantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
