import React from "react";

const Legend = ({ palette, data }) => {
  console.log(data);
  const items = data?.map((i, j) => {
    return (
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <div
          style={{ height: "6px", width: "6px", backgroundColor: palette[j] }}
        />
        {i.name} ({i.value})
      </div>
    );
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        fontSize: "8px",
      }}
    >
      {items}
    </div>
  );
};

export default Legend;
