import { Tabs } from "antd";
import AllStays from "Pages/Master/AllStays";
import MarketplaceStays from "./MarketplaceStays";
const onChange = (key) => {
  console.log(key);
};
const AddStay = ({ onImport }) => {
  const items = [
    {
      key: "1",
      label: <>My Listings</>,
      children: (
        <AllStays importable onImport={onImport} location="ITINERARY" />
      ),
    },
    {
      key: "2",
      label: `Marketplace`,
      children: <MarketplaceStays importable onImport={onImport} />,
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
export default AddStay;
