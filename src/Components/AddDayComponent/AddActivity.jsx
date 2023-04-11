import { Tabs } from "antd";
import AllActivities from "Pages/Master/AllActivities";
import MarketplaceActivities from "./MarketplaceActivities";
const onChange = (key) => {
  console.log(key);
};
const AddActivity = ({ onImport }) => {
  const items = [
    {
      key: "1",
      label: <>My Listings</>,
      children: (
        <AllActivities importable onImport={onImport} location="ITINERARY" />
      ),
    },
    {
      key: "2",
      label: `Marketplace`,
      children: <MarketplaceActivities importable onImport={onImport} />,
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
export default AddActivity;
