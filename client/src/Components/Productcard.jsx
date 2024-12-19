import React from "react";

const Productcard = ({
  id,
  imageUrl,
  brand,
  productName,
  price,
  originalPrice,
  onClick,
}) => {
  return (
    <div onClick={() => onClick(id)}>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
          <img
            src={imageUrl}
            alt="Product"
            className="h-80 w-72 object-contain rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {brand}
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {productName}
            </p>
            <div className="flex ">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹{price}
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  ₹{originalPrice}
                </p>
              </del>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Productcard;
