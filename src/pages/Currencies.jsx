import React, { useState, useEffect } from "react";
import Cryptocurrency from "../components/CryptoCurrency";
import { BsSearch } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdDarkMode } from "react-icons/md";
import { Circles } from "react-loader-spinner";

const Currencies = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState("");
  const [dark, setDark] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let perPage = 12;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  useEffect(() => {
    const fetchCoins = async () => {
      let response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      );
      let dataa = await response.json();
      setData(dataa);
      setTotalPages(Math.ceil(dataa.length / perPage));
      setLoading(false);
    };

    fetchCoins();
  }, []);

  if (window.innerWidth >= 768) {
    perPage = 20;
  }
  const navigateToNextPage = () => {
    if (currentPage < Math.ceil(data.length / perPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <>
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="loader"
          visible={loading}
        />
      </>
    );
  }

  const handleSearch = () => {
    if (data === null) {
      return [];
    }
    return data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searched.toLowerCase()) ||
        coin.name.toLowerCase().includes(searched.toLowerCase())
    );
  };

  return (
    <>
      <div
        className={
          dark
            ? "w-[100%] p-6 pt-9 mb-16 bg-gray-900 text-white"
            : " w-[100%] p-6 pt-9 mb-16 bg-gray-100 text-black"
        }
      >
        <div className="flex justify-between">
          <h1 className="font-bold text-lg mb-4">
            Cryptocurrency Prices by Market Cap
          </h1>
          <button
            type="button"
            onClick={() => setDark(!dark)}
            className={
              dark
                ? "bg-white text-black  px-3 text-sm  h-[2rem] rounded-full font-bold"
                : "bg-black text-white px-3 text-sm  h-[2rem] rounded-full font-bold"
            }
          >
            {dark ? <HiOutlineLightBulb /> : <MdDarkMode />}
          </button>
        </div>

        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for a Crypto Currency....."
              name="searched"
              onChange={(e) => setSearched(e.target.value)}
              value={searched}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4 pl-10"
            />
            <i className="icon">
              <BsSearch className="text-blue-500" />
            </i>
          </div>

          <div className="global2">
            {handleSearch()
              .slice(startIndex, endIndex)
              .map((item, index) => (
                <Cryptocurrency item={item} key={item.id} index={index} />
              ))}
          </div>
          <div className="flex justify-between mt-4 ">
            <button
              className="bg-green-500 text-blue-800 py-2 px-4 rounded-md hover:bg-green-900 hover:text-green-500 focus:outline-none focus:ring focus:border-blue-300"
              onClick={navigateToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              className="bg-green-500 text-blue-800 py-2 px-4 rounded-md hover:bg-green-900 hover:text-green-500 focus:outline-none focus:ring focus:border-blue-300"
              onClick={navigateToNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Currencies;
