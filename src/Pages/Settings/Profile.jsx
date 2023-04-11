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
  Space,
  Typography,
  Upload,
} from "antd";
import {
  SaveOutlined,
  MoreOutlined,
  InboxOutlined,
  PlusOutlined,
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

const Profile = () => {
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const { authuser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

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
          <Col>
            <Title level={3}>My Settings</Title>
          </Col>
          <Col></Col>
        </Row>
      </div>
      <div
        style={{
          height: "80%",
          display: "flex",
          padding: "18px 90px",
        }}
      >
        <div style={{ flex: 3 }}>
          <Row>
            <Dropdown menu={menuProps} trigger={["click", "contextMenu"]}>
              <div style={{ cursor: "pointer" }}>
                <Avatar
                  size={80}
                  src={profile?.user_info?.photo_url}
                  style={
                    {
                      // backgroundColor: profile?.user_info?.color ?? "orange",
                    }
                  }
                >
                  {getInitials(profile?.user_info?.display_name)}
                </Avatar>
              </div>
            </Dropdown>
          </Row>
          <Row>
            <h3 style={{ color: "#444" }}>
              {profile?.user_info?.display_name}
            </h3>
          </Row>
        </div>
        <div
          style={{
            flex: 7,
            overflowY: "auto",
            paddingRight: "18px",
          }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={profile?.user_info}
            onFinish={(values) => {
              console.log(values);
              save(values);
            }}
            onFieldsChange={() => {
              setIsFormDirty(form.isFieldsTouched());
            }}
          >
            <Form.Item
              name="display_name"
              label="Full Name"
              rules={[
                { type: "string", required: true, message: "Name is required" },
              ]}
            >
              <Input size="large"></Input>
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
              <Input disabled size="large"></Input>
            </Form.Item>
            <Form.Item name="phone_number" label="Phone Number">
              <Input size="large" placeholder="Enter Phone Number"></Input>
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input size="large" placeholder="Enter New Password"></Input>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        style={{
          padding: "30px 90px",
          background: "white",
          boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 40px",
        }}
      >
        <Row justify="end" align="middle" gutter={12}>
          <Col>
            <Button
              size="large"
              type="primary"
              disabled={!isFormDirty}
              icon={<SaveOutlined />}
              style={{ paddingRight: "30px", paddingLeft: "30px" }}
              loading={loading}
              onClick={() => {
                form.submit();
              }}
            >
              {isFormDirty ? "Save" : "Saved"}
            </Button>
          </Col>
          <Col>
            <Dropdown
              menu={{
                items: [
                  { key: "suicide", label: "Delete My Account", danger: true },
                ],
                onClick(e) {
                  console.log(e.key);
                },
              }}
              trigger={["click"]}
            >
              <Button icon={<MoreOutlined />} size="large" type="text"></Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
