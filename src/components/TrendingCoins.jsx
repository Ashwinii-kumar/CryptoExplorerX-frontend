import React, { useEffect, useState } from "react";
import Crypto from "./Crypto";
import { NavLink } from "react-router-dom";
import { Circles } from "react-loader-spinner";




const fetchGlobalData = async () => {
  let response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
  );
  let data = await response.json();

  return data;
};

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocalData = async () => {
      fetchGlobalData()
        .then((res) => {
          setTrendingCoins(res);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    getLocalData();
  }, []);

  if (loading) {
    return (
      <>
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="loaderr"
          visible={loading}
        />
      </>
    );
  }

  return (
    <>
      <div className="mt-6">
        <div className="flex w-[100%] justify-between items-center mb-6">
          <h1 className="text-lg font-bolder  sm:text-sm sm:font-bold">
            Top 10 Cryptos In The World
          </h1>
          <NavLink
            to="/currencies"
            className="bg-blue-500 text-white text-md font-bold px-4 rounded-2xl my-auto py-1 sm:text-sm sm:font-bolder"
          >
            Show More
          </NavLink>
        </div>
        <div className="global2">
          {trendingCoins !== null ? (
            trendingCoins.map((item, index) => (
              <Crypto key={item.id} item={item} index={index} />
            ))
          ) : (
            <p>No coins to be found....</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TrendingCoins;
