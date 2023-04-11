import {
  Space,
  Layout,
  Row,
  Col,
  Button,
  Drawer,
  message,
  Typography,
  Breadcrumb,
  Spin,
  Empty,
  Avatar,
  Input,
  Tag,
} from "antd";
import {
  HomeOutlined,
  GroupOutlined,
  UserOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import ItineraryDrawerForm from "Forms/ItineraryDrawerForm";
import React, { useEffect, useRef, useState } from "react";
import ItineraryRow from "./ItineraryRow";
import { useSelector } from "react-redux";
import { getInitials, getRandomColor } from "utils/stringFunctions";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { useDispatch } from "react-redux";
import { AxiosAll } from "services/NetworkEngine";
import paths from "services/apiConstants";
import { CompanyMember } from "redux/actions/CompanyAction";
import BreadCrumbHeader from "Components/BreadCrumbHeader";
import ItineraryService from "services/ItineraryService";

const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

const AllItineraries = ({
  source = "MASTER",
  importable = false,
  onImport,
}) => {
  useKeyboardShortcut(
    ["Shift", "k"],
    (shortcutKeys) => {
      searchInputRef.current.focus({
        cursor: "all",
      });
    },
    {
      overrideSystem: true,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  );
  useKeyboardShortcut(
    ["Shift", "n"],
    (shortcutKeys) => {
      setAddItineraryDrawerOpen(true);
    },
    {
      overrideSystem: true,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  );

  const searchInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [addItineraryDrawerOpen, setAddItineraryDrawerOpen] = useState(false);

  const [itineraries, setItineraries] = useState([]);

  const refresh = async () => {
    setLoading(true);
    let resp = await ItineraryService.getItineraries({ source });
    console.log("itineraries", resp);
    if (resp.success) {
      setItineraries(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const itineraryRows = itineraries.map((l, i) => {
    return (
      <ItineraryRow
        data={l}
        key={i}
        importable={importable}
        onImport={onImport}
      />
    );
  });

  return (
    <Layout style={{ height: "200%", overflow: "auto" }}>
      {addItineraryDrawerOpen && (
        <ItineraryDrawerForm
          open={addItineraryDrawerOpen}
          onClose={async () => {
            setAddItineraryDrawerOpen(false);
            refresh();
          }}
        />
      )}
      <Row
        gutter={[12, 6]}
        style={{
          padding: "12px",
          position: "sticky",
          top: "0px",
          backgroundColor: "white",
          zIndex: 2,
        }}
        align={"middle"}
      >
        <Col>
          <Input
            ref={searchInputRef}
            prefix={<SearchOutlined />}
            suffix={
              <Tag
                style={{
                  color: "#ccc",
                  backgroundColor: "#fdfdfd",
                  border: "1px solid #ccc",
                }}
              >
                Shift+K
              </Tag>
            }
            allowClear
            bordered={false}
            placeholder="Search"
          />
        </Col>
        <Col flex={"auto"}></Col>
        <Col>
          {!importable && (
            <Button
              type="primary"
              style={{ paddingRight: "6px" }}
              size="middle"
              onClick={() => {
                setAddItineraryDrawerOpen(true);
              }}
            >
              New Itinerary
              <span>
                <Tag
                  style={{
                    marginLeft: "6px",
                    color: "white",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                  }}
                >
                  Shift+N
                </Tag>
              </span>
            </Button>
          )}
        </Col>
      </Row>

      <Spin tip="Loading" spinning={loading}>
        {itineraries.length ? (
          <Space
            size={"small"}
            direction="vertical"
            style={{
              width: "100%",
              padding: "6px 12px",
            }}
          >
            {itineraryRows}
          </Space>
        ) : !loading ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 60,
            }}
            description={
              <Space direction="vertical">
                <Text>No data</Text>
                <div>
                  <span>
                    Something wrong?
                    <br />
                    <a target={"_blank"} href="/contact">
                      Let us know
                    </a>
                    . We really appreciate it.
                  </span>
                </div>
              </Space>
            }
          ></Empty>
        ) : (
          <></>
        )}
      </Spin>
    </Layout>
  );
};

export default AllItineraries;
