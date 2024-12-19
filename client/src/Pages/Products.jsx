import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProductCard = ({ product, onClick }) => (
  <div className="border rounded-lg p-4 flex flex-col items-center relative">
    <img
      src={product.imageUrl}
      alt={product.productName}
      className="w-32 h-32 object-contain mb-2"
    />
    <h3 className="font-semibold text-lg mb-1">{product.productName}</h3>
    <div className="flex items-center mb-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400">
          ★
        </span>
      ))}
      <span className="ml-1 text-gray-600">({product.reviews})</span>
    </div>
    <p className="font-bold">₹{product.price}</p>
    <div className="absolute top-2 right-2 flex space-x-2">
      <button className="text-gray-500 hover:text-red-500">❤</button>
      <button className="text-gray-500 hover:text-blue-500">🛒</button>
    </div>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({});
  const [sortBy, setSortBy] = useState("featured");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";
  const [sortedProducts, setSortedProducts] = useState(products);

  const fetchProducts = async (query = "") => {
    try {
      const endpoint = query
        ? `https://www.api.karthikeshrobotics.in/product?search=${encodeURIComponent(
            query
          )}`
        : "https://www.api.karthikeshrobotics.in/product";

      const response = await fetch(endpoint);
      const data = await response.json();
      const mappedProducts = data.map((product) => ({
        id: product.productId,
        imageUrl: `https://api.karthikeshrobotics.in/images/products/${product.productImages[0]?.filename}`,
        productName: product.productName,
        price: product.productPrice,
        originalPrice: product.productPrice,
        reviews: Math.floor(Math.random() * 1000) + 1,
        subcategoryName: product.subcategory.subcategoryName,
      }));
      setProducts(mappedProducts);

      const uniqueCategories = [
        ...new Set(mappedProducts.map((p) => p.subcategoryName)),
      ];
      setCategories(uniqueCategories);

      const initialSelectedCategories = {};
      uniqueCategories.forEach(
        (cat) => (initialSelectedCategories[cat] = false)
      );
      setSelectedCategories(initialSelectedCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchProducts(searchQuery);
    }
  }, [searchQuery]);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);

    let sortedArray = [...products];
    if (sortValue === "price-asc") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      sortedArray.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sortedArray);
  };

  const filteredProducts = products.filter(
    (product) =>
      (Object.values(selectedCategories).every((v) => v === false) ||
        selectedCategories[product.subcategoryName]) &&
      (!minPrice || product.price >= Number(minPrice)) &&
      (!maxPrice || product.price <= Number(maxPrice))
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">
        {searchQuery
          ? `Found ${filteredProducts.length} results for "${searchQuery}"`
          : `Showing all ${filteredProducts.length} products`}
      </h1>

      <div className="flex">
        <div className="w-1/4 pr-4">
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Price</h2>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border rounded p-1 w-1/2"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border rounded p-1 w-1/2"
              />
            </div>
          </div>

          <h2 className="font-semibold mb-2">Browse Categories</h2>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={selectedCategories[category]}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4">
          <div className="mb-4 flex justify-end">
            <select
              onChange={handleSort}
              value={sortBy}
              className="border rounded p-1"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
