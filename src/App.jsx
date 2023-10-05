import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Exchanges from "./pages/Exchanges";
import Currencies from "./pages/Currencies";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import Watchlist from "./pages/Watchlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const user = useSelector((state) => state.user.user);
const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(()=>{
  
    const callServer=async()=>{
      try {
        let response=await fetch(`${apiUrl}`);
        let  data=response.json();
        if(response.ok){
          toast.success("Server is up and running...", {
            autoClose: 1000,
            className: "custom-toast-container",
            bodyClassName: "custom-toast-message",
          });
        }else{
          toast.error("Server Connection Failed, Check Your Network", {
            autoClose: 2000,
            className: "custom-toast-container",
            bodyClassName: "custom-toast-message",
          });
        }

      } catch (error) {
        toast.error("Registered User's Services Unavailable,Public Services will Run", {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      }
    }
   
   callServer();




  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="exchanges" element={<Exchanges />} />
          <Route path="currencies" element={<Currencies />} />
          <Route path="currencies/coin/:id" element={<Coin />} />
          <Route path="login" element={user === null ? <Login /> : <Error />} />
          <Route
            path="signup"
            element={user === null ? <Signup /> : <Error />}
          />
          <Route
            path="watchlist"
            element={user === null ? <Error /> : <Watchlist />}
          />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
