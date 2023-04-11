import "./styles.scss";
import Stays from "./AllStays";
import Transports from "./AllTransports";
import Activities from "./AllActivities";
import Itineraries from "./AllItineraries";
import VisaServices from "./AllVisa";
import { Layout, Tabs } from "antd";
import BreadCrumbHeader from "Components/BreadCrumbHeader";
function MasterData() {
  const options = [
    {
      key: 0,
      label: "Stays",
      children: <Stays location="MASTER" />,
    },
    {
      key: 1,
      label: "Activities",
      children: <Activities location="MASTER" />,
    },
    {
      key: 2,
      label: "Itineraries",
      children: <Itineraries location="MASTER" />,
    },
    {
      key: 3,
      label: "Visa Services",
      children: <VisaServices location="MASTER" />,
    },
    {
      key: 4,
      label: "Transportation",
      children: <Transports location="MASTER" />,
    },
  ];
  return (
    <Layout style={{ overflow: "auto", backgroundColor: "white" }}>
      <BreadCrumbHeader config={{ name: "My Listings" }} />
      <Tabs type="card" items={options} />
    </Layout>
  );
}

export default MasterData;
