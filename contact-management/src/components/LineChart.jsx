/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Covid-19 case timeline",
      color: "rgba(219, 178, 0, 0.8)",
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(219, 178, 0, 0.2)",
      },
      ticks: {
        color: "rgba(219, 178, 0, 0.8)",
      },
    },
    y: {
      grid: {
        color: "rgba(219, 178, 0, 0.2)",
      },
      ticks: {
        color: "rgba(219, 178, 0, 0.8)",
      },
    },
  },
};

const LineChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Cases",
        data: [],
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=20"
        );
        const data = response.data;
        const casesData = data.cases;

        const dates = Object.keys(casesData);
        const cases = Object.values(casesData);

        const dataSet = {
          labels: dates,
          datasets: [
            {
              label: "Cases",
              data: cases,
              fill: false,
              borderColor: "rgba(219, 178, 0, 0.8)",
              backgroundColor: "rgba(219, 178, 0, 0.8)",
            },
          ],
        };

        setData(dataSet);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    }

    fetchData();
  }, []);
  return <Line options={options} data={data} />;
};

export default LineChart;