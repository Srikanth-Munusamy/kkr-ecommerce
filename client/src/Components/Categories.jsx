import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import eelc from "../Assets/electriccomponent.png";
import diy from "../Assets/diy.png";
import batteries from "../Assets/batteries.png";
import iot from "../Assets/iot.png";
import motor from "../Assets/motor.png";
import threed from "../Assets/3d.png";
const categories = [
  {
    title: "Electronic Components",
    description:
      "Electronic components like Resistors, Capacitors, Inductors, semiconductor ICs, Relays form the backbone of all the technological advances today.",
    image: eelc,
  },
  {
    title: "DIY Learning & Robot kits",
    description:
      "Electronic components like Resistors, Capacitors, Inductors, semiconductor ICs, Relays form the backbone of all the technological advances today.",
    image: diy,
  },
  {
    title: "Batteries & Accessories",
    description:
      "Electronic components like Resistors, Capacitors, Inductors, semiconductor ICs, Relays form the backbone of all the technological advances today.",
    image: batteries,
  },
  {
    title: "3D Printers & Parts",
    description:
      "Electronic components like Resistors, Capacitors, Inductors, semiconductor ICs, Relays form the backbone of all the technological advances today.",
    image: threed,
  },
  {
    title: "Motors & Actuators",
    description:
      "Electronic components like Resistors, Capacitors, Inductors, semiconductor ICs, Relays form the backbone of all the technological advances today.",
    image: motor,
  },
  {
    title: "IOT & Wireless",
    description:
      "Electronic components like Resistors, Capacitors, Inductors, semiconductor ICs, Relays form the backbone of all the technological advances today.",
    image: iot,
  },
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-8">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-lg border rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-40 object-contain rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                {category.title}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-gray-400 -rotate-45"
                />
              </h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
