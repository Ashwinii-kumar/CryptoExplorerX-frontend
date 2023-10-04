import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { add_rate } from "../redux/RateSlice";
import { useDispatch } from "react-redux";

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRates = async () => {
      let response = await fetch(
        "https://api.coingecko.com/api/v3/exchange_rates"
      );
      let data = await response.json();
      let rates = [];
      rates.push(data.rates.usd);
      rates.push(data.rates.inr);
      dispatch(add_rate(rates));
    };

    fetchRates();
  }, []);

  return (
    <>
      <div className="border-2 border-black w-[100%] h-[100%]  flex flex-col justify-between">
        <div className="h-[100%] min-h-screen flex md:flex-row max-sm:flex-col sm:flex-col w-[100%] bg-slate-600 ">
          <Navbar />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
