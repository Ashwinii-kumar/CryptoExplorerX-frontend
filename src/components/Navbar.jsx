import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaExchangeAlt, FaRegNewspaper, FaBars } from "react-icons/fa";
import { GrCurrency, GrFormView } from "react-icons/gr";
import { BsBookmarksFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/UserSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(  window.innerWidth < 768);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[load,setLoad]=useState(false);

  const onLogoutHandler = (e) => {
    setLoad(true);
    closeMobileMenu(); 
    dispatch(logout());
    localStorage.removeItem("user");
    setLoad(false);
    toast.success("You logged out successfully", {
      autoClose: 2000,
      className: "custom-toast-container",
      bodyClassName: "custom-toast-message",
    });
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false); // Close the mobile menu
  };

  useEffect(()=>{
    //  console.log("rendered");       
    const handleResize=()=>{
      setIsMobileMenuOpen(window.innerWidth<768);
    };

    window.addEventListener("resize",handleResize);

    return ()=>{
      window.removeEventListener("resize",handleResize);
    };

  },[]);
  

  return (
    <nav className="bg-slate-950 p-4 md:w-[30vw]  md:px-8 md:pt-8">
      <div className="container mx-auto flex md:flex-col items-center justify-between ">
        <NavLink to='/' className="text-green-500  md:text-2xl font-semibold ">
          CryptoExplorerX
        </NavLink>
        {window.innerWidth < 768 && (
          <button
            className="text-white text-2xl hidden sm:block"
            onClick={toggleMobileMenu}
          >
            <FaBars className=" text-green-300" />
          </button>
        )}
      </div>
      {isMobileMenuOpen || window.innerWidth >= 768 ? (
        <ul className="flex flex-col  md:flex pt-6 pb-4 md:pt-8 list-none text-white md:leading-10 space-y-4 sm:leading-8 md:pl-10">
          <li>
            <NavLink
              to="/"
              className={(nav) =>
                nav.isActive
                  ? "bg-green-900 text-green-200 px-4 py-2 w-[100%] rounded-sm"
                  : "pl-2 w-[100%]"
              }
              onClick={closeMobileMenu} 
            >
              <FaHome className="inline mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/currencies"
              className={(nav) =>
                nav.isActive
                  ? "bg-green-900 text-green-200 px-4 py-2 w-[100%] rounded-sm"
                  : "pl-2 w-[100%]"
              }
              onClick={closeMobileMenu} 
            >
              <GrCurrency
                className="inline mr-2"
                style={{ backgroundColor: "white" }}
              />
              Currencies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/exchanges"
              className={(nav) =>
                nav.isActive
                  ? "bg-green-900 text-green-200 px-4 py-2 w-[100%] rounded-sm"
                  : "pl-2 w-[100%]"
              }
              onClick={closeMobileMenu} 
            >
              <FaExchangeAlt className="inline mr-2" /> Exchanges
            </NavLink>
          </li>
          <li className="mb-6 mt-6 ">
            <NavLink
              to="/watchlist"
              className={
                user !== null
                  ? "bg-blue-500 text-white text-md font-bold px-2 py-1 rounded-md   flex justify-center items-center sm:px-3 sm:text-sm sm:w-[25%] "
                  : "hidden"
              }
              onClick={closeMobileMenu} 
            >
              <GrFormView className=" inline mr-2  bg-blue-500" />
              WatchList
            </NavLink>
          </li>
          <div className="flex md:flex-col justify-between w-[100%]">
            <li className="mb-4">
              <NavLink
                to="/login"
                className={
                  user === null
                    ? "bg-blue-500 text-white text-md rounded-sm font-bold px-2 py-2   sm:text-sm md:w-[100%] sm:w-[25%]  sm:px-7 md:px-6 "
                    : "hidden"
                }
                onClick={closeMobileMenu} 
              
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={
                  user === null
                    ? "bg-orange-500 text-white text-md rounded-sm font-bold  py-2   sm:text-sm md:w-[100%] sm:w-[25%]  sm:px-6 md:px-5"
                    : "hidden"
                }
              onClick={closeMobileMenu} 
                
              >
                Signup
              </NavLink>
            </li>
          </div>

          <li>
            <button
              type="button"
              onClick={onLogoutHandler}
              disabled={load}
              className={
                user !== null
                  ? "bg-red-500 text-white text-md rounded-sm font-bold px-2 py-1   sm:text-sm md:w-[100%] sm:w-[25%]  sm:px-2 "
                  : "hidden"
              }
              
            >
              {load ? (
              <>
                <ThreeDots
                  height="30"
                  width="60"
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
                <p>Logout</p>
              </>
            )}
            </button>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Navbar;
