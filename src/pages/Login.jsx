import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    };

    try {
      let response = await fetch(`${apiUrl}/api/v1/login`, options);

      let data = await response.json();

      if (response.ok) {
        let userAdded = {
          id: `${data.user}`,
          token: `${data.token}`,
        };
        localStorage.setItem("user", JSON.stringify(userAdded));
        dispatch(login({ ...userAdded }));

        toast.success("Login Successful", {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
        navigate("/");
      } else {
        toast.error(data.message || "Unknown error occurred", {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
        return;
      }
    } catch (error) {
      toast.error(error.message || "Someting Went Wrong...", {
        autoClose: 2000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
      return;
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-[100vh] flex justify-center items-start mx-auto   w-[100vw] md:mt-20 pt-10">
      <div className="bg-white rounded-lg p-8 shadow-md mt-10">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={onChangeHandler}
              name="password"
              value={formData.password}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-[100%]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
