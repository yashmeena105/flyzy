import {
  Col,
  Row,
  Typography,
  Input,
  Space,
  Segmented,
  message,
  Divider,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import PreviewListing from "./components/PreviewListing";
import StayList from "./components/StayList";
import TourPackageList from "./components/TourPackageList";
import sentTone from "Assets/tones/sent.mp3";
import ItineraryService from "services/ItineraryService";
import LeadService from "services/LeadService";
import QueryService from "services/QueryService";
import NotificationService from "services/NotificationService";
import { useSelector } from "react-redux";
import { getDateRangeStr } from "utils/stringFunctions";
import ActivityList from "./components/ActivityList";
import TransportList from "./components/TransportList";
import VisaList from "./components/VisaList";

const { Title, Text } = Typography;
const { Search } = Input;
const MarketplaceHome = () => {
  const { authuser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const [key, setKey] = useState("Accommodations");
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {}, []);
  const navigate = useNavigate();
  const [playSentTone] = useSound(sentTone);

  const sendMarketplaceRequest = async (data) => {
    this.setLoading(true);
    let resp = await ItineraryService.sendRequestToVendors({
      unconfirmed: this.state?.unconfirmedState?.ucf,
    });
    if (resp.success)
      this.props.showNotification({
        title: "Vendor request sent successfully.",
        description:
          "We'll let you know when they reply or confirm your request.",
        placement: "top",
      });
    else message.error(resp.error);
    this.refresh();
  };

  const onImport = async (data) => {
    console.log("imported data", data);
    let comp = data.data;
    console.log();
    let payload = {};
    let component = {
      type: data.type,
      vendor_id: comp.company_id._id,
      company_id: comp.company_id._id,
      master_component: comp,
      items_selected: comp.items_selected,
      // Will be ignored in case of other than stay
      checkin_or_checkout: "CHECKIN",
    };

    payload = {
      days: {
        emptyday: { componentIds: [] },
        day1: {
          componentIds: ["comp1"],
        },
        day2: {
          componentIds: ["comp2"],
        },
      },
      dayOrder: ["day1"],
      dayComponents: {
        comp1: component,
      },
      info: {
        og_lead_or_query: "QUERY",
        start_date_utc: data.data?.start_date_utc,
        end_date_utc: data.data?.end_date_utc,
        query_description:
          comp?.name +
          " - " +
          getDateRangeStr([data.data?.start_date_utc, data.data?.end_date_utc]),
      },
    };
    if (data.type == "STAY") {
      payload.dayComponents.comp2 = { ...component };
      payload.dayComponents.comp2.checkin_or_checkout = "CHECKOUT";
      let n = comp?.no_of_days ?? 1;
      for (let i = 1; i < n; i++) {
        payload.dayOrder.push("emptyday");
      }
      payload.dayOrder.push("day2");
    }
    let resp = await QueryService.addQuery({ payload });
    if (resp.success) {
      console.log("query resp", resp);
      playSentTone();
      message.success("Inquiry sent!");
      await NotificationService.sendNotification({
        company_id: comp.company_id,
        message: {
          notification: {
            title: "New query from " + profile.user_info?.display_name,
            body: comp?.name,
          },
        },
      });
    } else {
      message.error(resp.error);
    }
  };

  const items = () => {
    switch (key) {
      case "Tour Packages":
        return <TourPackageList searchText={searchText} />;
      case "Accommodations":
        return <StayList searchText={searchText} onImport={onImport} />;
      case "Activities":
        return <ActivityList searchText={searchText} onImport={onImport} />;
      case "Transfer":
        return <TransportList searchText={searchText} onImport={onImport} />;
      case "Visa":
        return <VisaList searchText={searchText} onImport={onImport} />;

      default:
        return <></>;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row
        justify="center"
        align="stretch"
        style={{
          backgroundImage:
            "linear-gradient(#0005, #0006),url('https://storage.googleapis.com/flyzyzero-public/marketplace-cover.png')",
          backgroundSize: "contain",
          padding: "40px 0",
        }}
      >
        <Col style={{ textAlign: "center" }}>
          <Title style={{ color: "white" }} level={3}>
            ZERO Marketplace
          </Title>
          <Title style={{ color: "white" }} level={4}>
            Discover the best travel inventory, and serve your customers
            instantly
          </Title>
          <div style={{ height: "20px" }}></div>
          <Search
            placeholder="Search Marketplace"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={setSearchText}
          />
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        gutter={[12, 6]}
        style={{ padding: "20px 12px" }}
      >
        <Col style={{ overflow: "auto" }} flex="auto">
          <Segmented
            options={[
              // "Tour Packages",
              "Accommodations",
              "Activities",
              // "Flight",
              "Transfer",
              "Visa",
            ]}
            value={key}
            onChange={setKey}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              navigate("/queries");
            }}
          >
            My Queries
          </Button>
        </Col>
      </Row>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "20px" }}>
        {items()}
      </div>
    </div>
  );
};

export default MarketplaceHome;
