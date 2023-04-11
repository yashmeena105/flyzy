import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { softColors } from "utils/constants";
import { doughnutdata, piedata } from "./data";
import Legend from "./Legend";

const data = piedata.datasets[0].data.map((d, i) => {
  return { name: piedata.sources[i], value: d };
});
const PieChart = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "end",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "100%",
          width: "30px",
          alignItems: "end",
        }}
      >
        <Legend data={data} palette={softColors} />
      </div>
      <div>
        <Pie data={piedata} width={160} />
      </div>
    </div>
  );
};

export default PieChart;
