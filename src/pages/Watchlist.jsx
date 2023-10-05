import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromWatchlist, setWatchlist } from "../redux/WatclistSlice";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiSolidNavigation } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circles, ThreeDots } from "react-loader-spinner";

const Watchlist = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const watchlist = useSelector((state) => state.watchlist.coins);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState({});
  useEffect(() => {
    setLoading(true);
    fetchWatchlist();
    setLoading(false);
  }, [dispatch]);

  const fetchWatchlist = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      let response = await fetch(`${apiUrl}/api/v1/getWatchlist/${user.id}`, options);
      let data = await response.json();

      if (response.ok) {
        dispatch(setWatchlist(data.watchlist));
      } else {
        toast.error(data.message || "Unknown error occurred", {
          autoClose: 1000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      }
    } catch (error) {
      toast.error(data.message || "Unknown error occurred", {
        autoClose: 1000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
    }
  };

  const handleDelete = async (name, price, id) => {
    setLoad((prev)=>({...prev,[id]:true}));
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
      }),
    };
    try {
      let response = await fetch(
        `${apiUrl}/api/v1/deleteFromWatchlist/${user.id}`,
        options
      );

      let data = await response.json();

      if (response.ok) {
        dispatch(deleteFromWatchlist(id));
    setLoad((prev)=>({...prev,[id]:false}));
        
        toast.success("Entry Deleted Successfully", {
          autoClose: 1000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      } else {
    setLoad((prev)=>({...prev,[id]:false}));
        

        toast.error(data.message || "Unknown error occurred", {
          autoClose: 1000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      }
    } catch (error) {
    setLoad((prev)=>({...prev,[id]:false}));
      

      toast.error(error.message || "Someting Went Wrong...", {
        autoClose: 1000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
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
    <div className="h-[100vh] w-[100vw] flex-col py-10 space-y-8 bg-black">
      {watchlist.length === 0 ? (
        <div className="bg-black  h-[100vh] w-[75%] sm:w-[100%] flex justify-around items-start">
          <div className="text-center p-10 md:mt-10 flex flex-col justify-start items-start border-2 bg-white shadow-[5px_5px_0px_0px_rgba(109,40,217)] ">
            <p className="text-purple-500  mb-10">Your Watchlist Is Empty...</p>
            <button
              type="button"
              className=" hover:text-blue-700 text-xl underline flex bg-green-400 text-green-900 px-2 py-2   items-center rounded-e-2xl space-x-2"
              onClick={() => navigate("/currencies")}
            >
              <span className="text-sm font-bold">Add Crypto To Watchlist</span>
              <BiSolidNavigation className="text-blue-900 hover:text-blue-500" />{" "}
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center text-white text-xl font-bold">
            Watchlist
          </h1>
          <div className="overflow-x-auto h-[100%] w-[55%] sm:w-[80%] mx-auto my-auto ">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-orange-900 to-blue-900 text-white">
                  <th className="px-4 py-2 border">Sno.</th>
                  <th className="px-4 py-2 border">Crypto</th>
                  <th className="px-4 py-2 border">Price in USD</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">View</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((crypto, index) => (
                  <tr
                    key={crypto._id}
                    className="bg-gradient-to-r from-gray-900 to-gray-900 text-white"
                  >
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {crypto.name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      ${crypto.price.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="text-red-500 text-xl hover:text-red-700"
                        onClick={() =>
                          handleDelete(crypto.name, crypto.price, crypto._id)
                        }
                        disabled={load}
                      >
                        {load[crypto._id] ? (
                          <>
                            <ThreeDots
                              height="20"
                              width="40"
                              radius="9"
                              color="red"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClassName=""
                              visible={load}
                            />
                          </>
                        ) : (
                          <>
                            <AiFillDelete />
                          </>
                        )}
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        type="button"
                        className="text-green-400 hover:text-green-700 text-xl"
                        onClick={() =>
                          navigate(`/currencies/coin/${crypto.name}`)
                        }
                      >
                        <BiSolidNavigation />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
