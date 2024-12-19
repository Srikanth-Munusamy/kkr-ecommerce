import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../Assets/signupimage.png";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://shop.karthikeshrobotics.in/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      console.log(response.data);

      setSuccess("Signup successful!");
      setError("");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-36 -left-20 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter opacity-70"></div>
      <div className="absolute -bottom-36 -right-20 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter opacity-70"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter opacity-70"></div>

      {/* Left side with illustration */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div>
          <img src={image} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Join & Connect
          </h2>

          <div className="flex space-x-4 mb-6">
            <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Sign up with Google
            </button>
            <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
              <FontAwesomeIcon icon={faGithub} className="mr-2" />
              Sign up with Github
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 border-b rounded-md focus:outline-none focus:border-green-500"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 border-b rounded-md focus:outline-none focus:border-green-500"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full px-3 py-2 border-b rounded-md focus:outline-none focus:border-green-500"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I accept the Terms & Conditions
                </label>
              </div>
              <button
                type="submit"
                className="font-bold px-10 py-2 text-green-500 bg-black rounded-full hover:bg-gray-800 transition duration-300"
              >
                SIGN UP
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Own an Account?{" "}
            <Link to="/login" className="underline font-bold">
              Jump right now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
