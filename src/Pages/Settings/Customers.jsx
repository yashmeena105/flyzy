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
  Space,
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

const { Title, Text } = Typography;
const { Dragger } = Upload;
const { Search } = Input;

const items = [
  {
    key: "edit",
    label: "Change Photo",
  },
  {
    key: "delete",
    label: "Remove Photo",
    danger: true,
  },
];
const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
);

const Customers = () => {
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const { authuser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [selectedView, setSelectedView] = useState("list");

  const refresh = async () => {
    let resp = await UserService.getMyProfile();
    if (resp.success) {
      console.log("my profile response", resp.data);
      dispatch(UpdateProfile(resp.data.profile));
    }
  };
  useEffect(() => {
    refresh();
  }, []);

  const save = async (values) => {
    setLoading(true);
    let resp = await UserService.updateMyProfile(values);
    if (resp.success) {
      message.success("Profile Updated");
      setIsFormDirty(false);
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
        setShowUpdateProfileModal(true);
        break;
      case "delete":
        break;
      default:
        break;
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
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
        open={showUpdateProfileModal}
        onCancel={() => {
          setShowUpdateProfileModal(false);
        }}
        footer={null}
      >
        {/* <ImgCrop rotationSlider zoomSlider minZoom={0.2} cropShape="round"> */}
        <Upload
          accept="image/png, image/jpeg"
          listType="picture-card"
          fileList={[]}
          customRequest={async (options) => {
            const { onSuccess, onError, file, onProgress } = options;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", `${file?.type}`);

            var requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: file,
              redirect: "follow",
            };

            const url = localStorage.getItem("uploadUrl");

            await fetch(url, requestOptions)
              .then((result) => {
                if (result?.status === 200) {
                  message.success("Profile picture updated");
                  setShowUpdateProfileModal(false);
                  refresh();
                }
              })
              .catch((error) => {
                message.error(error.message);
              });
          }}
          multiple={false}
          beforeUpload={async (file) => {
            let data = {
              photo: {
                name: file.name,
                size: file.size,
                type: file.type,
                uid: file.uid,
              },
            };
            let response = await AxiosAll(
              "PUT",
              paths?.profile,
              data,
              authuser.uid
            );
            const url = response.data?.uploadUrl ?? "";
            localStorage.setItem("uploadUrl", url);
          }}
        >
          {uploadButton}
        </Upload>
        {/* </ImgCrop> */}
      </Modal>
      <div style={{ padding: "0 90px" }}>
        <Row justify="space-between" align="bottom">
          <Title level={3}>Customers</Title>
          <Space>
            <Search placeholder="Search..." allowClear />
            <Tooltip placement="left" title="Download Report">
              <Dropdown
                menu={{
                  items: [
                    { key: "xlsx", label: "Download XLSX" },
                    { key: "csv", label: "Download CSV" },
                  ],
                  onClick(e) {
                    console.log(e.key);
                  },
                }}
                trigger={["click"]}
              >
                <Button icon={<CloudDownloadOutlined />}></Button>
              </Dropdown>
            </Tooltip>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Customer
            </Button>
          </Space>
        </Row>
        <Tabs
          defaultActiveKey="list"
          // tabBarExtraContent={<Search placeholder="Search..." allowClear />}
          items={[
            {
              label: (
                <span>
                  <UnorderedListOutlined /> List
                </span>
              ),
              key: "list",
              children: <div style={{ height: "1000px" }}>H</div>,
            },
            {
              key: "cards",
              label: (
                <span>
                  <AppstoreOutlined /> Cards
                </span>
              ),
              children: <>J</>,
            },
          ]}
        ></Tabs>
      </div>
    </div>
  );
};

export default Customers;
