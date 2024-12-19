import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import image from "../Assets/signupimage.png"; // Make sure this path is correct

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://shop.karthikeshrobotics.in/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("UID", token);
        navigate("/");
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      setError(error.message);
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
            Welcome Back to KKR Community
          </h2>

          <form onSubmit={onSubmit}>
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

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="font-bold px-10 py-2 text-green-500 bg-black rounded-full hover:bg-gray-800 transition duration-300"
              >
                SIGN IN
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            No account yet?{" "}
            <Link to="/signup" className="underline font-bold">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
