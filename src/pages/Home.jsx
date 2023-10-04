import React from "react";
import GlobalCryptoStats from "../components/GlobalCryptoStats";
import TrendingCoins from "../components/TrendingCoins";

const Home = () => {
  return (
    <>
      <div className="w-[100%] p-8 home">
        <GlobalCryptoStats />
        <TrendingCoins />
      </div>
    </>
  );
};

export default Home;
