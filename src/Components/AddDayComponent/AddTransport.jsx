import { Tabs } from "antd";
import AllTransport from "Pages/Master/AllTransports";
import MarketplaceTransports from "./MarketplaceTransports";
const onChange = (key) => {
  console.log(key);
};
const AddTransport = ({ onImport }) => {
  const items = [
    {
      key: "1",
      label: <>My Listings</>,
      children: (
        <AllTransport importable onImport={onImport} location="ITINERARY" />
      ),
    },
    {
      key: "2",
      label: `Marketplace`,
      children: <MarketplaceTransports importable onImport={onImport} />,
    },
  ];
  return (
    <Tabs
      tabPosition="left"
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};
export default AddTransport;
