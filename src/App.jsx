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
