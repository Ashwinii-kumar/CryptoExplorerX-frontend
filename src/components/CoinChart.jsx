import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Circles } from "react-loader-spinner";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const CoinChart = ({ id }) => {
  const [selected, setSelected] = useState({ value: 1, label: "24h" });
  const [historicalData, setHistoricalData] = useState(null);
  const fetchHistoricalData = async () => {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${selected.value}`
    );
    let data = await response.json();
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [selected]);

  const options = [
    { value: 1, label: "24h" },
    { value: 30, label: "30 Days" },
    { value: 90, label: "3 Months" },
    { value: 365, label: "1 Year" },
  ];
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#fff",
      backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#212529",

      border: "none",
      boxShadow: "none",
      width: "50%",
      height: "3rem",
      display: "flex",
      justifyContent: "center",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "white" }),
  };
  const handleChange = (option) => {
    setSelected(option);
  };

  return (
    <div className="mb-10">
      <Select
        options={options}
        styles={customStyles}
        onChange={handleChange}
        autoFocus={true}
      />
      <br />
      <br />
      {historicalData !== null ? (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()}AM`;

                return selected === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((item) => item[1]),
                  label: `Price (Past ${selected.value} Days) in USD`,
                  borderColor: "orange",
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              elements: {
                point: {
                  radius: 0.3,
                },
                line: {
                  tension: 0.3,
                },
              },
              scales: {
                x: {
                  grid: {
                    color: "rgba(108,122,137)", // Color for x-axis grid lines
                  },
                  ticks: {
                    color: "lightBlue", // Color for x-axis tick marks
                  },
                },
                y: {
                  grid: {
                    color: "rgba(108,122,137)", // Color for y-axis grid lines
                  },
                  ticks: {
                    color: "lightBlue", // Color for y-axis tick marks
                  },
                },
              },
            }}
          />
        </>
      ) : (
        <>
          <p>Loadig...</p>
        </>
      )}
    </div>
  );
};

export default CoinChart;


