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
} from "@ant-design/icons";
import VisaDrawerForm from "Forms/VisaDrawerForm";
import React, { useEffect, useRef, useState } from "react";
import VisaRow from "./VisaRow";
import { useSelector } from "react-redux";
import { getInitials, getRandomColor } from "utils/stringFunctions";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { useDispatch } from "react-redux";
import { AxiosAll } from "services/NetworkEngine";
import paths from "services/apiConstants";
import { CompanyMember } from "redux/actions/CompanyAction";
import BreadCrumbHeader from "Components/BreadCrumbHeader";
import MasterService from "services/MasterService";

const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

const AllVisa = ({ importable = false, onImport, location }) => {
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
      setAddVisaDrawerOpen(true);
    },
    {
      overrideSystem: true,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  );

  const searchInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [addVisaDrawerOpen, setAddVisaDrawerOpen] = useState(false);

  const [visas, setVisas] = useState([]);

  const refresh = async () => {
    setLoading(true);
    let resp = await MasterService.getAllVisa();
    console.log("visas", resp);
    if (resp.success) {
      setVisas(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const visaRows = visas.map((l, i) => {
    return (
      <VisaRow
        data={l}
        key={i}
        importable={importable}
        onImport={onImport}
        location={location}
      />
    );
  });

  return (
    <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
      <VisaDrawerForm
        open={addVisaDrawerOpen}
        onClose={async () => {
          setAddVisaDrawerOpen(false);
          refresh();
        }}
      />
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
          <Button
            type="primary"
            style={{ paddingRight: "6px" }}
            size="middle"
            onClick={() => {
              setAddVisaDrawerOpen(true);
            }}
          >
            New Visa
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
        </Col>
      </Row>

      <Spin tip="Loading" spinning={loading}>
        {visas.length ? (
          <Space
            size={"small"}
            direction="vertical"
            style={{
              width: "100%",
              padding: "6px 12px",
            }}
          >
            {visaRows}
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

export default AllVisa;
