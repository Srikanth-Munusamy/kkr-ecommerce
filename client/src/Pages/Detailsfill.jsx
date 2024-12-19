import React, { useState } from "react";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const DetailsFill = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const UID = localStorage.getItem("UID"); 
    if (!UID) {
      console.error("No UID found in localStorage");
      return;
    }

    const userRef = doc(db, "users", UID); 
    navigate("/");
 
    try {
      await setDoc(userRef, {
        name,
        streetAddress,
        city,
        state,
        postalCode,
        country,
        phoneNumber,
        alternatePhoneNumber,
        landmark,
        gender,
      });
      navigate("/");

      console.log("Data successfully stored in Firebase with UID:", UID);
      setName("");
      setStreetAddress("");
      setCity("");
      setState("");
      setPostalCode("");
      setCountry("");
      setPhoneNumber("");
      setAlternatePhoneNumber("");
      setLandmark("");
      setGender("");
    } catch (error) {
      console.error("Error storing data in Firebase:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Street Address:
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        State/Province/Region:
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <label>
        Postal Code/ZIP Code:
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <label>
        Alternate Phone Number:
        <input
          type="text"
          value={alternatePhoneNumber}
          onChange={(e) => setAlternatePhoneNumber(e.target.value)}
        />
      </label>
      <label>
        Landmark:
        <input
          type="text"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DetailsFill;
