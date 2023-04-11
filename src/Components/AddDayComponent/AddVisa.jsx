import { Tabs } from "antd";
import AllVisa from "Pages/Master/AllVisa";
import MarketplaceVisas from "./MarketplaceVisas";
const onChange = (key) => {
  console.log(key);
};
const AddVisa = ({ onImport }) => {
  const items = [
    {
      key: "1",
      label: <>My Listings</>,
      children: <AllVisa importable onImport={onImport} location="ITINERARY" />,
    },
    {
      key: "2",
      label: `Marketplace`,
      children: <MarketplaceVisas importable onImport={onImport} />,
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
export default AddVisa;
