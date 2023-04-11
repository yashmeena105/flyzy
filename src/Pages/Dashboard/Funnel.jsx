import React from "react";
import { FunnelChart } from "react-funnel-pipeline";
import "react-funnel-pipeline/dist/index.css";
import { leadStatuses, softColors } from "utils/constants";
import Legend from "./Legend";

const fakevalues = [1, 3, 2, 2, 1, 1, 1];

const data = leadStatuses.map((s, i) => {
  return { name: s.label, value: fakevalues[i] };
});

const Funnel = () => {
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
        <FunnelChart
          showRunningTotal
          heightRelativeToValue
          chartHeight={70}
          chartWidth={150}
          style={{ width: "160px" }}
          data={data}
          pallette={softColors}
        />
      </div>
    </div>
  );
};

export default Funnel;
