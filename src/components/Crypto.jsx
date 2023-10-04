import React from "react";

const getCurrency = (data) => {
  let currency = new Intl.NumberFormat("en-US", {
    currency: "USD",
    notation: "compact",
  });
  return currency.format(data);
};

const getPer = (data) => {
  return data.toFixed(2);
};

const Crypto = ({ item, index }) => {
  return (
    <>
      <div className="flex flex-col bg-white justify-start  p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex items-center w-[100%] justify-between mb-2">
          <p className="font-bold">
            {index + 1}. {item.name}
          </p>
          <img src={item.image} className="h-[40px] w-[40px] rounded-full" />
        </div>
        <div className="w-[100%] h-[1px]  bg-gray-300"></div>
        <div className="mt-2 leading-8 text-gray-800">
          <p>Price : ${getCurrency(item.current_price)}</p>
          <p>Market Cap: ${getCurrency(item.market_cap)}</p>
          <p>
            Daily Price Change :{" "}
            {getPer(item?.price_change_percentage_24h_in_currency)}%
          </p>
        </div>
      </div>
    </>
  );
};

export default Crypto;
