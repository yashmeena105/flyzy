import React from "react";
import { requirementOptions } from "utils/constants";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import FlightIcon from "@mui/icons-material/Flight";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Row, Typography } from "antd";

const { Text } = Typography;

const MiniRequirementTags = ({ requirementsList }) => {
  const getIcon = (req, active) => {
    switch (req) {
      case "FLIGHT":
        return (
          <FlightIcon
            key={req}
            fontSize="small"
            color={active ? "primary" : "disabled"}
          />
        );
      case "TRANSPORT":
        return (
          <LocalTaxiIcon
            key={req}
            fontSize="small"
            color={active ? "primary" : "disabled"}
          />
        );
      case "STAY":
        return (
          <ApartmentIcon
            key={req}
            fontSize="small"
            color={active ? "primary" : "disabled"}
          />
        );
      case "STAY":
        return (
          <ApartmentIcon
            key={req}
            fontSize="small"
            color={active ? "primary" : "disabled"}
          />
        );
      case "ACTIVITY":
        return (
          <DirectionsBoatIcon
            key={req}
            fontSize="small"
            color={active ? "primary" : "disabled"}
          />
        );
      case "VISA":
        return (
          <Text key={req} style={{ color: active ? "#1976d2" : "lightgray" }}>
            VISA
          </Text>
        );
      default:
        break;
    }
  };
  return (
    <Row align="middle">
      {requirementOptions.map((r, j) => {
        return getIcon(r, requirementsList.includes(r));
      })}
    </Row>
  );
};

export default MiniRequirementTags;
