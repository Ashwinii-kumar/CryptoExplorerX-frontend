import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "../components/CoinChart";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchList, deleteFromWatchlist } from "../redux/WatclistSlice";
import { Circles, ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Coin = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((state) => state.user.user);
  const watchlist = useSelector((state) => state.watchlist.coins);
  const dispatch = useDispatch();
  const[load,setLoad]=useState(false);

  useEffect(() => {
    if (watchlist.length !== 0) {
      let index = watchlist.findIndex((item) => item.name === id);
      if (index !== -1) {
        
        setFlag(true);
      } else {
        setFlag(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCoinData = async () => {
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      let dataa = await response.json();
      setData(dataa);
      setLoading(false);
    };

    fetchCoinData();
  }, []);

  const getCurrency = (data) => {
    let currency = new Intl.NumberFormat("en-US", {
      currency: "USD",
      notation: "compact",
    });
    return currency.format(data);
  };

  //add to watchlist
  const onClickHandler = async (e) => {
    setLoad(true);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: id,
        price: data.market_data.current_price.usd,
      }),
    };

    try {
      let response = await fetch(
        `${apiUrl}/addToWatchlist/${user.id}`,
        options
      );

      let dataa = await response.json();

      if (response.ok) {
        let coinToAdd = {
          name: id,
          price: data.market_data.current_price.usd,
        };
        dispatch(addToWatchList(coinToAdd));
        setFlag(true);
        setLoad(false);
        toast.success("Added To Watchlist", {
          autoClose: 1500,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      } else {
        setLoad(false);
        toast.error(dataa.message || "Unknown error occurred", {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      }
    } catch (error) {
      setLoad(false);
      toast.error(
        data.message === "token is invalid"
          ? "Login Again"
          : "Unknown error occurred",
        {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        }
      );
    }
  };

  //remove from watchlist
  const onRemoveHandler = async (e) => {
    setLoad(true);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: id,
        price: data.market_data.current_price.usd,
      }),
    };

    try {
      let response = await fetch(
        `${apiUrl}/deleteFromWatchlist/${user.id}`,
        options
      );

      let dataa = await response.json();

      if (response.ok) {
        dispatch(deleteFromWatchlist(id));
        setFlag(false);
        setLoad(false);
        toast.success("Removed From Watchlist", {
          autoClose: 1500,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      } else {
        setLoad(false);
        toast.error(dataa.message || "Unknown error occurred", {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      }
    } catch (error) {
      setLoad(false);
      toast.error(
        data.message === "token is invalid"
          ? "Login Again"
          : "Unknown error occurred",
        {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        }
      );
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

  return (
    <>
      {data !== null ? (
        <div className="bg-gray-900 text-white p-8 pt-10 w-[100vw] min-h-[100vh]">
          <div>
            <h1 className="font-bold mb-4 text-xl">
              {data.name} ({data.symbol.toUpperCase()}) Price
            </h1>
            <p className="text-gray-500 mb-4">
              {parse(data.description.en.split(".")[0])}.
            </p>
            <p>
              Market Cap Rank :{" "}
              <span className="font-bolder text-green-500">
                {data.market_cap_rank}
              </span>
            </p>
            <p>
              Price :{" "}
              <span className="text-blue-500">
                ${getCurrency(data.market_data.current_price.usd)}
              </span>
            </p>
            <p>
              Market Cap :{" "}
              <span className="font-bold text-orange-500 ">
                ${getCurrency(data.market_data.market_cap.usd)}
              </span>
            </p>

            {flag === true ? (
              <button
                type="button"
                onClick={onRemoveHandler}
                disabled={load}
                className={
                  user !== null
                    ? "bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-2xl mt-4 mb-8"
                    : "hidden"
                }
              >
               {load ? (
              <>
                <ThreeDots
                  height="20"
                  width="30"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={load}
                />
              </>
            ) : (
              <>
                <p>Remove From Watchlist</p>
              </>
            )}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClickHandler}
                disabled={load}
                className={
                  user !== null
                    ? "bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-2xl mt-4 mb-8"
                    : "hidden"
                }
              >
                 {load ? (
              <>
                <ThreeDots
                  height="20"
                  width="30"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={load}
                />
              </>
            ) : (
              <>
                <p>Add To Watchlist</p>
              </>
            )}
              </button>
            )}
          </div>

          <div className="w-[100%] h-[1px] bg-gray-600"></div>
          <div>
            <h2 className="font-bolder mb-4 text-lg mt-6">
              {data.name} Price Chart
            </h2>
            <CoinChart id={id} />
          </div>
        </div>
      ) : (
        <p>No Data To Display....</p>
      )}
    </>
  );
};

export default Coin;
