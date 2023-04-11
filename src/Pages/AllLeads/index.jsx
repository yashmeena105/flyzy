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
  FilterOutlined,
} from "@ant-design/icons";
import LeadDrawerForm from "Forms/LeadDrawerForm";
import React, { useEffect, useRef, useState } from "react";
import LeadService from "services/LeadService";
import LeadRow from "./LeadRow";
import { useSelector } from "react-redux";
import { getInitials, getRandomColor } from "utils/stringFunctions";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { useDispatch } from "react-redux";
import { AxiosAll } from "services/NetworkEngine";
import paths from "services/apiConstants";
import { CompanyMember } from "redux/actions/CompanyAction";
import BreadCrumbHeader from "Components/BreadCrumbHeader";

const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

const AllLeads = () => {
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
      setAddLeadDrawerOpen(true);
    },
    {
      overrideSystem: true,
      ignoreInputFields: true,
      repeatOnHold: false,
    }
  );

  const searchInputRef = useRef(null);

  const { authuser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [addLeadDrawerOpen, setAddLeadDrawerOpen] = useState(false);

  const [leads, setLeads] = useState([]);
  const [usersList, setUsersList] = useState();

  const getLeads = async () => {
    setLoading(true);
    let resp = await LeadService.getLeads();
    if (resp.success) {
      setLeads(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLeads();
    getCompanyUser();
  }, []);

  const leadRows = leads.map((l, i) => {
    return <LeadRow data={l} key={i} refresh={getLeads} />;
  });

  const getCompanyUser = async () => {
    let users = await AxiosAll("POST", paths.getCompanyUser, {}, authuser.uid);
    setUsersList(users);
    dispatch(CompanyMember(users));
    console.log("users list", users?.data);
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
      <LeadDrawerForm
        open={addLeadDrawerOpen}
        onClose={async () => {
          setAddLeadDrawerOpen(false);
          getLeads();
        }}
      />
      <BreadCrumbHeader config={{ name: "All Leads" }} />
      <Row
        gutter={[12, 6]}
        style={{
          padding: "12px",
          position: "sticky",
          top: "0px",
          backgroundColor: "white",
          zIndex: 1,
        }}
        align={"middle"}
      >
        <Col>
          <Input
            ref={searchInputRef}
            prefix={<SearchOutlined style={{ color: "gray" }} />}
            allowClear
            bordered={false}
            placeholder="Search [ Shift+K ]"
          />
        </Col>
        <Col>
          <Button
            type="text"
            icon={<FilterOutlined style={{ color: "gray" }} />}
          >
            <span style={{ color: "gray" }}>Filter</span>
          </Button>
        </Col>
        <Col flex={"auto"}></Col>
        <Col>
          <Button
            type="primary"
            style={{ paddingRight: "6px" }}
            size="middle"
            onClick={() => {
              setAddLeadDrawerOpen(true);
            }}
          >
            New Lead
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
        {leads.length ? (
          <Space
            size={"small"}
            direction="vertical"
            style={{
              width: "100%",
              padding: "6px 12px",
            }}
          >
            {leadRows}
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

export default AllLeads;
