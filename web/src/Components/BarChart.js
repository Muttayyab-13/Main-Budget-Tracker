import { Line } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const BarChart = ({ budgetEntries, time }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Generate data for the last 7 days
    const generateLast7DaysData = () => {
      const last7DaysData = [];
      for (let i = 0; i < time; i++) {
        const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
        const entry = budgetEntries.find((entry) => entry.date === date);
        last7DaysData.push({
          date,
          value: entry ? entry.price : 0, // If no entry, default to 0
        });
      }
      setData(last7DaysData.reverse()); // Reverse to show the oldest date first
    };

    generateLast7DaysData();
  }, [budgetEntries, time]);

  const config = {
    data,
    xField: "date",
    yField: "value",
    point: {
      shape: "circle",
      size: 4,
    },
    tooltip: {
      showMarkers: false,
    },
    lineStyle: {
      lineWidth: 2,
    },
    smooth: true, // Makes the line smooth
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `₹${v}`, // Format y-axis label with currency symbol
      },
    },
  };

  return <Line {...config} />;
};

export default BarChart;
