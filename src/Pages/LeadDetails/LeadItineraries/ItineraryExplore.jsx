import { Space, Tabs } from "antd";
import AllItineraries from "Pages/Master/AllItineraries";
import React from "react";
import MarketplaceItineraries from "./MarketplaceItineraries";

const ItineraryExplore = ({ onImport, browsing }) => {
  const items = [
    {
      key: "1",
      label: <>My Listings</>,
      children: (
        <AllItineraries importable onImport={onImport} source="MASTER" />
      ),
    },
    {
      key: "2",
      label: `Marketplace`,
      children: (
        <AllItineraries importable onImport={onImport} source="MARKETPLACE" />
      ),
    },
  ];
  return (
    <>
      <Tabs tabPosition="left" items={items} />
    </>
  );
};

export default ItineraryExplore;
