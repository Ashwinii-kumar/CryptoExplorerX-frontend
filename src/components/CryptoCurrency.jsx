import React from "react";
import { NavLink } from "react-router-dom";

const getCurrency = (data) => {
  let currency = new Intl.NumberFormat("en-US", {
    currency: "USD",
    notation: "compact",
  });
  return currency.format(data);
};

const getPer = (data) => {
  if (data !== null) {
    return data.toFixed(2);
  }
  return null;
};

const Cryptocurrency = ({ item, index }) => {
  return (
    <>
      <div className="flex flex-col bg-white justify-start  p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
        <div className="flex items-center w-[100%] justify-between mb-2">
          <p className="font-bold text-gray-900">
            {item.market_cap_rank}. {item.name}
          </p>
          <img src={item.image} className="h-[40px] w-[40px] rounded-full" />
        </div>
        <div className="w-[100%] h-[1px]  bg-gray-300"></div>
        <div className="mt-2 leading-8 text-gray-800 sm:flex sm:justify-between">
          <p>Price : ${getCurrency(item.current_price)}</p>
          <p>Market Cap : <span className="font-bold ">${getCurrency(item.market_cap)}</span></p>
          <p className="hidden md:block mb-3">
            Daily Price Change : {getPer(item.price_change_percentage_24h)}%
          </p>
          <NavLink
            to={`/currencies/coin/${item.id}`}
            className="bg-purple-700 px-4 py-2 sm:font-bolder sm:px-2 sm:text-xs rounded-md text-white font-bold text-sm"
          >
            View
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Cryptocurrency;
