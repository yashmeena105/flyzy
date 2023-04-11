import { Box } from "@mui/material";
import Input from "Components/Input";
import React from "react";
import { paddingSmall } from "Styles/Global.jsx";
const AddressInput = () => {
  return (
    <>
      <Input label="Address Line 1" placeholder="Address Line 1" marginBottom={paddingSmall} />
      {/* <MaterialInput/> */}
      <Input label="Address Line 2" placeholder="Address Line 2" marginBottom={paddingSmall} />
      <div className="inputRow">
        <div className="flexBox">
          <Input label="City" placeholder="City" marginBottom={paddingSmall} />
        </div>
        <Box sx={{ m: "4px" }} />
        <div className="flexBox">
          <Input
            label="State"
            placeholder="State"
            marginBottom={paddingSmall}
          />
        </div>
      </div>
      <div className="inputRow">
        <div className="flexBox">
          <Input
            label="Pin/zip Code"
            placeholder="e.g. 110022"
            marginBottom={paddingSmall}
          />
        </div>
        <Box sx={{ m: "4px" }} />
        <div className="flexBox">
          <Input
            label="Country"
            placeholder="Country"
            marginBottom={paddingSmall}
          />
        </div>
      </div>
    </>
  );
};

export default AddressInput;
