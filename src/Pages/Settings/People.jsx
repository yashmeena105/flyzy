import {
  Avatar,
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Row,
  Segmented,
  Select,
  Space,
  Table,
  Tabs,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import {
  SaveOutlined,
  MoreOutlined,
  InboxOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  CloudDownloadOutlined,
  CopyOutlined,
  UserDeleteOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { AxiosAll } from "services/NetworkEngine";
import paths from "services/apiConstants";
import { useSelector } from "react-redux";
import UserService from "services/UserService";
import { useDispatch } from "react-redux";
import { UpdateProfile } from "redux/actions/UserAction";
import { getInitials } from "utils/stringFunctions";
import CapLabel from "Components/v2/CapLabel";
import { roles } from "utils/constants";

const { Title, Text, Link, Paragraph } = Typography;
const { Dragger } = Upload;
const { Search } = Input;

const People = () => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState(roles.DEFAULT);

  const refresh = async () => {
    setLoading(true);
    let resp = await UserService.getCompanyMembers();
    if (resp.success) {
      console.log("members", resp.data[0].users);
      setMembers(resp.data[0].users);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    refresh();
  }, []);

  const inviteUsers = async () => {
    let temp = emails.trim().replace(" ", "");
    let list = temp.split(/\s*,\s*|\s+/);

    console.log("Data", { list, role });
  };

  const save = async (values) => {
    setLoading(true);
    let resp = await UserService.updateMyProfile(values);
    if (resp.success) {
      message.success("Profile Updated");
    } else {
      message.error(resp.error);
    }
    setLoading(false);
    refresh();
  };
  const handleMenuClick = (e) => {
    console.log("click", e.key);
    switch (e.key) {
      case "edit":
        setShowAddMemberModal(true);
        break;
      case "delete":
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: <CapLabel>NAME</CapLabel>,
      dataIndex: "name",
      key: "name",
      width: 120,
      render: (name, member) => (
        <Space>
          <Avatar src={member?.photoUrl}>{getInitials(member?.name)}</Avatar>
          <Text strong>{name}</Text>
        </Space>
      ),
    },
    {
      title: <CapLabel>EMAIL</CapLabel>,
      dataIndex: "email",
      key: "email",
      width: 120,
      render: (email) => (
        <Paragraph style={{ margin: "0" }} copyable>
          {email}
        </Paragraph>
      ),
    },
    {
      title: <CapLabel>ROLE</CapLabel>,
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (name, member) => (
        <div
          style={{
            borderLeft: "3px solid #1677ff",
            height: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Select
            size="small"
            bordered={false}
            defaultValue="MEMBER"
            options={[
              { label: "Member", value: roles.MEMBER },
              { label: "Admin", value: roles.ADMIN },
            ]}
          ></Select>
        </div>
      ),
    },
    {
      title: <CapLabel>SETTINGS</CapLabel>,
      key: "operation",
      fixed: "right",
      width: 50,
      render: () => (
        <Dropdown
          trigger={["click"]}
          placement="bottom"
          menu={{
            items: [
              {
                label: "Copy User Id",
                key: "COPY_UID",
                icon: <CopyOutlined />,
              },
              {
                label: "Remove",
                key: "REMOVE",
                icon: <UserDeleteOutlined />,
                danger: true,
              },
            ],
          }}
          arrow={false}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "clip",
      }}
    >
      <Modal
        title=" "
        width="400px"
        open={showAddMemberModal}
        onCancel={() => {
          setShowAddMemberModal(false);
        }}
        footer={null}
      >
        {/* <ImgCrop rotationSlider zoomSlider minZoom={0.2} cropShape="round"> */}

        {/* </ImgCrop> */}
      </Modal>
      <div style={{ padding: "0 90px" }}>
        <Row
          justify="space-between"
          align="middle"
          style={{
            margin: "24px 0",
          }}
        >
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Manage People
          </Text>
          <Space>
            <Link>Learn More</Link>
          </Space>
        </Row>
        <Row gutter={24}>
          <Col span={10}>
            <Search placeholder="Search by name or email" allowClear />
          </Col>
          <Col span={14}>
            <Space.Compact block>
              <Input
                placeholder="Invite by email (multiple lines and CS)"
                value={emails}
                onChange={(e) => {
                  setEmails(e.target.value);
                }}
              />
              <Select
                style={{ width: 180 }}
                options={[
                  { value: "MEMBER", label: "Member" },
                  { value: "ADMIN", label: "Admin" },
                ]}
                value={role}
                onChange={(value) => {
                  setRole(value);
                }}
              />
              <Button
                style={{ padding: "0 24px" }}
                type="primary"
                onClick={inviteUsers}
              >
                Invite
              </Button>
            </Space.Compact>
          </Col>
        </Row>
        <Row style={{ margin: "16px 0" }}>
          <Col>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Team Members ({members.length})
            </Text>
          </Col>
        </Row>
        <Table
          pagination={false}
          columns={columns}
          dataSource={members}
          scroll={{
            x: 800,
            y: 500,
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default People;
