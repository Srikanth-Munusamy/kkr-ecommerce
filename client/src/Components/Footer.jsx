import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="text-black font-bold text-2xl">KKR STORE</div>
          <button className="bg-black text-[#9FE206] px-9 py-3 rounded-full text-md">
            CONTACT US
          </button>
        </div>
        <hr />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>Track Your Order</li>
              <li>Videos</li>
              <li>FAQ</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">My Account</h3>
            <ul className="space-y-2 text-sm">
              <li>Cart</li>
              <li>Checkout</li>
              <li>My Account</li>
              <li>Payment Options</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>About us</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Shipping & Refund</li>
              <li>Teams</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow us</h3>
            <div className="flex space-x-4">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-gray-600 hover:text-black"
              />
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-gray-600 hover:text-black"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-gray-600 hover:text-black"
              />
              <FontAwesomeIcon
                icon={faYoutube}
                className="text-gray-600 hover:text-black"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2024 All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
