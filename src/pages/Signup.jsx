import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";


const validatePassword = (password) => {
  const regexLowercase = /[a-z]/;
  const regexUppercase = /[A-Z]/;
  const regexSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  } else if (!regexLowercase.test(password)) {
    return "Password must contain at least 1 lowercase letter";
  } else if (!regexUppercase.test(password)) {
    return "Password must contain at least 1 uppercase letter";
  } else if (!regexSpecialChar.test(password)) {
    return "Password must contain at least 1 special character";
  }

  return "";
};

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password || !formData.cpassword) {
    setLoading(false);

      toast.error("All fields must be set", {
        autoClose: 1000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
      return;
    }

    let a = validatePassword(formData.password);
    if (a !== "") {
    setLoading(false);

      toast.error(a, {
        autoClose: 1000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
      return;
    }

    if (formData.password !== formData.cpassword) {
    setLoading(false);

      toast.error("Passwords do not match", {
        autoClose: 1000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
      return;
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
      }),
    };

    try {

      let response = await fetch(`${apiUrl}/api/v1/signup`, options);
      let data = await response.json();

      if (response.ok) {
    setLoading(false);

        toast.success("Sign Up Successful", {
          autoClose: 1000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
        navigate("/login");

      } else {
    setLoading(false);

        toast.error(data.message || "Unknown error occurred", {
          autoClose: 1000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      }
    } catch (error) {
    setLoading(false);

      toast.error(error.message || "Someting Went Wrong...", {
        autoClose: 1000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-start mx-auto   w-[100vw] pt-20 md:mt-8">
      <div className="bg-white rounded-lg p-8  shadow-md ">
        <h1 className="text-2xl font-semibold mb-6">SignUp</h1>
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
              name="email"
              value={formData?.email}
              onChange={onChangeHandler}
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
              name="password"
              value={formData?.password}
              onChange={onChangeHandler}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="cpassword"
              className="block font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={formData?.cpassword}
              onChange={onChangeHandler}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-[100%] flex justify-center"
            disabled={loading}
          >
             {loading ? (
              <>
                <ThreeDots
                  height="30"
                  width="60"
                  radius="9"
                  color="lightGreen"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={loading}
                />
              </>
            ) : (
              <>
                <p>SignUp</p>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
