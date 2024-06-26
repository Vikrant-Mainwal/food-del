import React, { useState, useNavigate, useEffect, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { url,setToken ,token} = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     let newUrl = url;

//     if (currState === "Login") {
//         newUrl += "/api/users/login";
//     } else {
//         newUrl += "/api/users/register";
//     }

//     console.log("Request URL:", newUrl);
//     console.log("Form Data:", formData);

//     try {
//         const response = await axios.post(newUrl, formData);
//         console.log("Response:", response);

//         if (response.data.status) {
//             const token = response.data.token;
//             console.log("Token received:", token);

//             setToken(token);
//             localStorage.setItem("token", token);
//             console.log("Token stored in localStorage");

//             setShowLogin(false);
//         } else {
//             alert(response.data.message);
//         }
//     } catch (error) {
//         console.error("Error during submission:", error);
//         alert("An error occurred. Please try again.");
//     }
// };

const submitHandler = async (e) => {
  e.preventDefault();
  let newUrl = url;

  if (currState === "Login") {
      newUrl += "/api/users/login";
  } else {
      newUrl += "/api/users/register";
  }

  console.log("Request URL:", newUrl);
  console.log("Form Data:", formData);

  try {
      const response = await axios.post(newUrl, formData);
      console.log("Full Response:", response); // Log the entire response

      if (response.data) {
          console.log("Response Data:", response.data); // Log the response data

          if (response.data.success) {
              const token = response.data.token;
              console.log("Token received:", token); // Log the token

              if (token) {
                  setToken(token);
                  localStorage.setItem("token", token);
                  console.log("Token stored in localStorage");
                  setShowLogin(false);
              } else {
                  console.error("Token is undefined or null");
              }
          } else {
              console.error("Status is false or undefined");
              alert(response.data.message);
          }
      } else {
          console.error("Response data is undefined or null");
      }
  } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred. Please try again.");
  }
};


  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={submitHandler}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="your name"
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          )}

          <input
            type="email"
            placeholder="your email"
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password "
            required
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="login-popup-conditions">
          <input type="checkbox" required />
          <p>By continuing, I agree with the terms & conditions</p>
        </div>
        <button type="submit">
          {currState === "Sign-Up" ? "Sign up" : "Login"}
        </button>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign-Up")}>Sign-Up</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
