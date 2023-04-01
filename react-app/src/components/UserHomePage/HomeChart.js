import React from "react";
import "./HomeChart.css";
// import { Line } from "chart.js";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
// import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolio } from "../../store/portfolio";
import { fetchStockChartData, fetchStockDetails } from "../../Utils";
// import { useParams } from "react-router-dom";
import { addCommas } from "../../Utils";

// const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
// const BASE_URL = "https://api.polygon.io/v2/";

function HomeChart() {
  const dispatch = useDispatch();

  // const [buyingPower, setBuyingPower] = useState("");
  const [stockChartData, setStockChartData] = useState(null);
  const [dateRange, setDateRange] = useState(90);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [stockName, setStockName] = useState("");
  // const [activeclass, setActiveClass] = useState("")
  const [isActive, setActive] = useState(false);

  // const user = useSelector((state) => state.session?.user);
    const portfolio = useSelector((state) => state.portfolio);
      const history = useSelector((state) => state.history?.history);



    useEffect(() => {
        if (!history) {
            return
        }

    let historyArr = Object.values(history)
    if (historyArr.length) {
      const labels = historyArr.map((record) =>
        new Date(record.date).toLocaleDateString()
      );
      // console.log("dates for portfolio hist", labels);

        const prices = historyArr.map((result) => result.value_at_time);
        // console.log("prices for portfolio hist", prices)
            setStockChartData({
              labels,
              datasets: [
                {
                  data: prices,
                  backgroundColor: "none",
                  borderColor: "#5AC53B",
                  borderWidth: 2,
                  pointBorderColor: "rgba(0, 0, 0, 0)",
                  pointBackgroundColor: "rgba(0, 0, 0, 0)",
                  pointHoverBackgroundColor: "#5AC53B",
                  pointHoverBorderColor: "#000000",
                  pointHoverBorderWidth: 4,
                  pointHoverRadius: 6,
                  tension: 0.0,
                  fill: false,
                },
              ],
            });
    }


//     async function fetchHistory() {
//       const data = await fetchStockChartData();
//       const labels = data.results.map((result) =>
//         new Date(result.t).toLocaleDateString()
//       );
//       const prices = data.results.map((result) => result.c);
//       setStockChartData({
//         labels,
//         datasets: [
//           {
//             data: prices,
//             backgroundColor: "none",
//             borderColor: "#5AC53B",
//             borderWidth: 2,
//             pointBorderColor: "rgba(0, 0, 0, 0)",
//             pointBackgroundColor: "rgba(0, 0, 0, 0)",
//             pointHoverBackgroundColor: "#5AC53B",
//             pointHoverBorderColor: "#000000",
//             pointHoverBorderWidth: 4,
//             pointHoverRadius: 6,
//             tension: 0.0,
//             fill: false,
//           },
//         ],
//       });
//     }
//     fetchHistory();
    }, [history]);

//   useEffect(() => {
//     if (!ticker) {
//       return;
//     }
//     async function runFetchStockDetails() {
//       const data = await fetchStockDetails(ticker);
//       let openPrice = data.ticker.day.o;
//       let change = data.ticker.todaysChange;
//       let currentPrice = openPrice + change;

//       setCurrentPrice(currentPrice);
//       setStockName(data.ticker.ticker);
//     }
//     runFetchStockDetails();
//   }, [dateRange, ticker]);

  useEffect(() => {
    dispatch(getUserPortfolio());
  }, [dispatch]);

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: false,
    },
  };

  // const handleChange = (e) => {
  //   console.log("e from handleChange function", e)
  // }

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div className="chart-container">
      <div className="value-summary">
        <h1>{stockName}</h1>
        <h1>${addCommas(Number(currentPrice).toFixed(2))}</h1>
        <p>+$55.55 (+0.05%) Today</p>
      </div>
      <div className="line-chart">
        {stockChartData && <Line data={stockChartData} options={options} />}
      </div>
      <div className="timeline-container">
        <div className="timeline-buttons-container">
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(2);
              toggleClass();
            }}
          >
            1D
          </div>
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(7);
              toggleClass();
            }}
          >
            1W
          </div>
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(30);
              toggleClass();
            }}
          >
            1M
          </div>
          <div
            name="3M"
            className={isActive ? "timeline-button active" : "timeline-button"}
            // onClick={handleChange("3M")}
            onClick={() => {
              setDateRange(90);
              toggleClass();
            }}
          >
            3M
          </div>
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(365);
              toggleClass();
            }}
          >
            1Y
          </div>
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(365 * 5);
              toggleClass();
            }}
          >
            ALL
          </div>
        </div>
      </div>
      <div className="buying-power-container">
        <h2>Buying Power</h2>
        <h2>${addCommas(Number(portfolio?.balance).toFixed(2))}</h2>
      </div>
    </div>
  );
}

export default HomeChart;
