import React, { useState } from "react";
import LeadService from "services/LeadService";
import { getColorByStatus, status } from "utils/constants";

const Statuses = ({ currentValue, options, children, lead_id, refresh }) => {
  console.log("currentValue", currentValue);
  const tiles = options.map((o, i) => {
    let td = getColorByStatus(currentValue).textDefault;
    let ta = getColorByStatus(currentValue).textActive;
    let bd = getColorByStatus(currentValue).backgroundDefault;
    let ba = getColorByStatus(currentValue).backgroundActive;
    let ci;
    options.map((k, l) => {
      if (k.value == currentValue) ci = l;
      return;
    });
    console.log("ci", ci);
    // if (
    //   (value == status.CLOSED_LOST && o.value == status.CLOSED_WON) ||
    //   (value == status.CLOSED_WON && o.value == status.CLOSED_LOST)
    // )
    //   return <></>;
    return (
      <div
        style={{
          flex: 1,
          backgroundColor: i > ci ? "#F8FAFB" : i == ci ? ba : bd,
          textAlign: "center",
          color: i > ci ? "#7C879D" : i == ci ? ta : td,
          padding: "10px 0",
          cursor: "pointer",
          borderRadius:
            i == 0
              ? "8px 0 0 8px"
              : i == options.length - 1
              ? "0 8px 8px 0"
              : null,
        }}
        onClick={async () => {
          await LeadService.updateLead({
            payload: {
              lead_id: lead_id,
              status: o.value,
            },
          });
          refresh();
        }}
      >
        {o.label}
      </div>
    );
  });
  return (
    <div style={{ display: "flex", width: "100%", gap: "4px" }}>{tiles}</div>
  );
};

export default Statuses;
