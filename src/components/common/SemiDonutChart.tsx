"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const ProgressBarChart = ({ profitPercentage = 16.72 }) => {
  const option = {
    grid: {
      top: "60%",
      bottom: "10%",
    },
    yAxis: {
      type: "category",
      axisLine: { show: false },
      axisTick: { show: false },
      data: [profitPercentage === 0 ? "" : ""],
    },
    xAxis: {
      type: "value",
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    series: [
      {
        data: [profitPercentage],
        type: "bar",
        barCategoryGap: "0%",
        barMaxWidth: "100%",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: profitPercentage / 100,
              color: "#0E436B",
            },
            {
              offset: profitPercentage / 100,
              color: "#EEF2FF",
            },
          ]),
        },
      },
    ],
    label: {
      show: true,
      position: "top",
      distance: 20,
      offset: [5, 0],
      verticalAlign: "middle",
      formatter: "{c}%",
      fontSize: 25,
      color: "#0E436B",
    },
  };

  return (
    <div>
      <ReactECharts option={option} style={{ width: "100%", height: "72%" }} />
    </div>
  );
};

export default ProgressBarChart;
