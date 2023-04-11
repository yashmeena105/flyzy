import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { softColors } from "utils/constants";
import { doughnutdata } from "./data";
import Legend from "./Legend";

const data = doughnutdata.datasets[0].data.map((d, i) => {
  return { name: doughnutdata.sources[i], value: d };
});

const DoughnutChart = () => {
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
        <Doughnut data={doughnutdata} width={160} />
      </div>
    </div>
  );
};

export default DoughnutChart;
