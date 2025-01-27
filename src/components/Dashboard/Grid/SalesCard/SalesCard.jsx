import React, { useState } from "react";
import Chart from "react-apexcharts";

const SalesCard = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Developer Edition",
        data: [1500, 1418, 1456, 1526, 1356, 1256],
        color: "#1A56DB",
      },
      {
        name: "Designer Edition",
        data: [643, 413, 765, 412, 1423, 1731],
        color: "#7E3BF2",
      },
    ],
    options: {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: { enabled: false },
        toolbar: { show: false },
      },
      tooltip: {
        enabled: true,
        x: { show: false },
      },
      legend: { show: false },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: { enabled: false },
      stroke: { width: 6 },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: { left: 2, right: 2, top: 0 },
      },
      xaxis: {
        categories: [
          "01 February",
          "02 February",
          "03 February",
          "04 February",
          "05 February",
          "06 February",
          "07 February",
        ],
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: (value) => `$${value}`,
        },
      },
    },
  });

  const [ws, setWs] = useState(null);

  const handleGenerate = () => {
    if (!ws) {
      // Initialize WebSocket connection
      const socket = new WebSocket(
        "ws://localhost:8000/user/ws/sales-card-coordinates"
      );

      socket.onopen = () => {
        console.log("WebSocket connection established");
        socket.send("generate"); // Send "generate" message after connection
        console.log("Generate message sent");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received data:", data);

        // Update chart with new data
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [
            { name: "Developer Edition", data: data.x, color: "#1A56DB" },
            { name: "Designer Edition", data: data.y, color: "#7E3BF2" },
          ],
        }));
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setWs(socket);
    } else if (ws.readyState === WebSocket.OPEN) {
      ws.send("generate");
      console.log("Generate message sent");
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <div className="w-full bg-slate-700 rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            $12,423
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Sales this week
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          23%
          <svg
            className="w-3 h-3 ms-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>
      <div id="data-series-chart">
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height="200"
        />
      </div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
        <div className="flex justify-center items-center pt-5">
          <button
            type="button"
            onClick={handleGenerate}
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
