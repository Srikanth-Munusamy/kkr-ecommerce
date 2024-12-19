import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Featureditem = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.api.karthikeshrobotics.in/product"
        );
        const data = await response.json();
        const featuredProducts = data
          .filter((product) => product.isFeatured)
          .map((product) => ({
            id: product.productId,
            name: product.productName,
            price: product.productDiscontPrice,
            originalPrice: product.productPrice,
            imageUrl: `https://api.karthikeshrobotics.in/images/products/${product.productImages[0]?.filename}`,
            label: product.productBrand,
            isFeatured: product.isFeatured,
          }))
          .slice(0, 4);
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Top Picks</h2>
      <div className="relative">
        <div className="flex justify-between items-center space-x-4">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {products.map((product) => (
            <div key={product.id} className="flex-1 max-w-xs">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                  />
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.label}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-xs mb-2">Commodo sit amet</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">₹{product.price}</span>
                      <span className="text-gray-400 line-through text-sm ml-2">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <button className="text-green-500 border border-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featureditem;
