import React, { useState } from "react";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const UID = localStorage.getItem("UID");
    if (!UID) {
      console.error("No UID found in localStorage");
      return;
    }

    const userRef = doc(db, "users", UID);

    try {
      await setDoc(userRef, {
        fullName,
        username,
        profession,
        location,
        bio,
        email,
        receiveUpdates,
        showProfile,
      });
      console.log("Data successfully stored in Firebase with UID:", UID);
      navigate("/");
    } catch (error) {
      console.error("Error storing data in Firebase:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>
        {" "}
        <span className="text-gray-400"> Home / </span>Profile
      </h1>
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/4 bg-gray-100 p-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-600 text-5xl"
                />
              </div>
              <h2 className="text-xl font-semibold text-green-500">
                Joy Rutherford
              </h2>
            </div>
          </div>
          <div className="w-3/4 p-6">
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold mb-4">Profile</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profession
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                >
                  <option value="">Select your role</option>
                  {/* Add more options here */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Select your location</option>
                  {/* Add more options here */}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Your bio"
                ></textarea>
              </div>

              <h3 className="text-xl font-semibold mb-4">Account</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Preferences</h3>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-green-500"
                    checked={receiveUpdates}
                    onChange={(e) => setReceiveUpdates(e.target.checked)}
                  />
                  <span className="ml-2">Receive monthly product updates</span>
                </label>
              </div>
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={showProfile}
                    onChange={(e) => setShowProfile(e.target.checked)}
                  />
                  <span className="ml-2">
                    See info about people who view my profile
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save Information
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
