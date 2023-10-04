import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <h1>Some error occurred.</h1>
      <NavLink
        to="/home"
        className="bg-red-500 text-white text-md font-bold px-4 py-2 rounded-2xl"
      >
        Go To Home
      </NavLink>
    </>
  );
};

export default Error;
