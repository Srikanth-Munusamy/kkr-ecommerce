import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faBoxOpen,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import Arduino from "../Assets/arduino.png";
import Raspberry from "../Assets/rasberry.png";
import Cloud from "../Assets/cloud.png";
import ros from "../Assets/ros.png";
const WhyShopAndBrands = () => {
  const reasons = [
    { icon: faTruck, text: "Fast Delivery" },
    { icon: faBoxOpen, text: "Quality Products" },
    { icon: faHeadset, text: "24/7 Customer Support" },
  ];

  const brands = [
    { name: "Arduino", logo: Arduino },
    { name: "Raspberry Pi", logo: Raspberry },
    { name: "Custom Brand", logo: Cloud },
    { name: "ROS", logo: ros },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why Shop with Us
        </h2>
        <div className="flex justify-center space-x-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center">
              <FontAwesomeIcon
                icon={reason.icon}
                className="text-green-500 text-4xl mb-2"
              />
              <span className="text-sm">{reason.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-center mb-8">
          Our Featured Brands
        </h2>
        <div className="flex justify-center items-center space-x-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="w-36 h-36 flex items-center justify-center"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyShopAndBrands;
