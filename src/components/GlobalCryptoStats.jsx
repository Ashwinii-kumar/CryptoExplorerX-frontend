import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";

const fetchGlobalData = async () => {
  let response = await fetch("https://api.coingecko.com/api/v3/global");
  let data = await response.json();

  return data;
};
const fetchExchangeData = async () => {
  let response = await fetch("https://api.coingecko.com/api/v3/exchanges/list");
  let data = await response.json();

  return data;
};

const getTotalData = (data) => {
  let vol = 0;
  let individual = Object.entries(data);
  individual.forEach((item) => {
    let a = item[1];
    vol += a;
  });
  let currency = new Intl.NumberFormat("en-US", {
    currency: "USD",
    notation: "compact",
  });
  return currency.format(vol);
};

const GlobalCryptoStats = () => {
  const [globalData, setGlobalData] = useState(null);
  const [countExchange, setCountExchange] = useState(100);
  useEffect(() => {
    const getLocalData = async () => {
      fetchGlobalData()
        .then((res) => {
          setGlobalData(res);
        })
        .catch((err) =>  {
          toast.error(err.message || "Someting Went Wrong...", {
         autoClose: 2000,
         className: "custom-toast-container",
         bodyClassName: "custom-toast-message",
       });
     });
    };

    getLocalData();
  }, []);

  useEffect(() => {
    const getLocalData = async () => {
      fetchExchangeData()
        .then((res) => {
          setCountExchange(res.length);
        })
        .catch((err) => {
           toast.error(err.message || "Someting Went Wrong...", {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      });
    }
    

    getLocalData();
  }, []);

  return (
    <div className="w-[100%] bg-white ">
      <h1 className="home text-lg font-bolder pb-4 sm:text-sm sm:font-bold ">
        Global Crypto Stats
      </h1>
      <div className="global  w-[100%] p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gray ">
        <div>
          <h4 className="font-bold sm:text-gray-800 ">
            Active Cryptocurrencies
          </h4>
          <p className="text-gray-500">
            {globalData !== null
              ? ` ${globalData.data.active_cryptocurrencies}`
              : "30,230"}
          </p>
        </div>
        <div>
          <h4 className="font-bold sm:text-gray-800">Total Exchanges</h4>
          <p className="text-gray-500">{countExchange}</p>
        </div>
        <div>
          <h4 className="font-bold sm:text-gray-800">Total Market Cap</h4>
          <p className="text-gray-500">
            <FaDollarSign className="inline" />
            {globalData !== null
              ? `${getTotalData(globalData.data.total_market_cap)}`
              : "163,545"}
          </p>
        </div>
        <div>
          <h4 className="font-bold sm:text-gray-800">Total 24h Volume</h4>
          <p className="text-gray-500">
            <FaDollarSign className="inline" />
            36.5B
          </p>
        </div>
        <div>
          <h4 className="font-bold sm:text-gray-800">Market Cap Change(24h)</h4>
          <p className="text-gray-500">
            {globalData !== null
              ? `${globalData.data.market_cap_change_percentage_24h_usd.toFixed(
                  2
                )} %`
              : "700"}
          </p>
        </div>
        <div>
          <h4 className="font-bold sm:text-gray-800">Total Volume</h4>
          <p className="text-gray-500">
            {globalData !== null
              ? `${getTotalData(globalData.data.total_volume)}`
              : "163,545"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalCryptoStats;
