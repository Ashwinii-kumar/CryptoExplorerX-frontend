import React, { useEffect, useState } from "react";
import { BiSolidNavigation } from "react-icons/bi";
import { Circles } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Exchanges = () => {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //track current page
  const [currentPage, setCurrentPage] = useState(1);
  //track total number of pages
  const [totalPages, setTotalPages] = useState(1);
  //number of items per page
  const perPage = 10;
  // Calculate startIndex and endIndex based on currentPage and perPage
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const rates = useSelector((state) => state.rate.rate);
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        let response = await fetch(
          `https://api.coingecko.com/api/v3/exchanges?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        );
        let data = await response.json();
        setCoinData(data);
        setTotalPages(Math.ceil(data.length / perPage)); // Calculate the total number of pages
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchCoinData();
  }, []);

  const navigateToNextPage = () => {
    if (currentPage < Math.ceil(coinData.length / perPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //convert btc to usd
  const getInUsd = (val) => {
    if (rates.length !== 0) {
      let usd = rates[0].value;
      return val * usd;
    }

    return val;
  };

  const getCurrency = (data) => {
    let currency = new Intl.NumberFormat("en-US", {
      currency: "USD",
      notation: "compact",
    });
    return currency.format(data);
  };

  if (error) {
    return (
      <>
        <h1>
          {" "}
          Some Error Occurred while fetching data.PLease try again after some
          time.
        </h1>
      </>
    );
  }

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

  const navigateToExternalLink = (url) => {
    window.open(url, "_blank"); // Navigate to the external URL
  };

  return (
    !loading &&
    !error && (
      <div className="p-8 bg-gray-800 min-h-[100vh] w-[100vw]">
        <h1 className="font-bold text-white text-lg mb-6">
          Top Crypto Exchanges Ranked by Trust Score
        </h1>
        <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] overflow-x-auto h-[100%] w-[100%]  ">
          <table className="w-[100%] table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
                <th className="px-2 py-2 border border-gray-600 text-[.7rem] ">
                  Rank
                </th>
                <th className="px-4 py-2 border border-gray-600 text-[.7rem] ">
                  Exchange
                </th>

                <th className="px-4 py-2 border border-gray-600 text-[.7rem] ">
                  24h Volume
                </th>
                <th className="px-4 py-2 border border-gray-600 text-[.7rem]  ">
                  24h Volume(N)
                </th>
                <th className="px-4 py-2 border border-gray-600 text-[.7rem] sm:hidden ">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {coinData.slice(startIndex, endIndex).map((crypto, index) => (
                <tr
                  key={crypto.id}
                  className="bg-gradient-to-r from-slate-900 to-slate-800 text-white"
                >
                  <td className="border px-4 py-2 text-center border-gray-600">
                    {crypto.trust_score_rank}
                  </td>
                  <td className="border px-6 py-4 sm:py-2 sm:px-3  md:flex border-gray-600 justify-left  items-center ">
                    <img
                      src={crypto.image}
                      className="h-[40px] w-[40px] rounded-full sm:hidden"
                    />
                    <p className="pl-4 sm:pl-2">{crypto.name}</p>
                  </td>

                  <td className="border border-gray-600 px-4 py-2 sm:py-2 sm:px-3  text-center sm:text-[.8rem]">
                    ${" "}
                    {getCurrency(
                      getInUsd(crypto.trade_volume_24h_btc).toFixed(0)
                    )}
                  </td>
                  <td className="border border-gray-600 px-4 py-2 sm:py-2 sm:px-1  text-center sm:text-[.8rem]">
                    {rates.length === 0 ? "btc" : "$"}
                    {getCurrency(
                      getInUsd(crypto.trade_volume_24h_btc_normalized).toFixed(
                        0
                      )
                    )}
                  </td>
                  <td className="border border-gray-600 px-4 py-2 sm:py-2 sm:px-1 text-center sm:hidden">
                    <button
                      type="button"
                      className=" text-blue-400 hover:text-blue-700 text-xl sm:text-sm"
                      onClick={() => navigateToExternalLink(`${crypto.url}`)}
                    >
                      <BiSolidNavigation />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={navigateToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={navigateToNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Exchanges;
