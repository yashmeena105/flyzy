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

const CompanySettings = () => {
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
    let resp = await UserService.updateCompany(values);
    if (resp.success) {
      message.success("Company details updated");
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
                  message.success("Logo updated");
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
              logo: {
                name: file.name,
                size: file.size,
                type: file.type,
                uid: file.uid,
              },
            };
            let response = await UserService.updateCompanyLogo(data);
            if (response.success) {
              const url = response.data?.uploadUrl ?? "";
              localStorage.setItem("uploadUrl", url);
            } else {
              message.error("Something went wrong");
            }
          }}
        >
          {uploadButton}
        </Upload>
        {/* </ImgCrop> */}
      </Modal>
      <div style={{ padding: "0 90px" }}>
        <Row justify="space-between" align="bottom">
          <Col>
            <Title level={3}>Company Settings</Title>
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
                  src={profile?.company_id?.logo?.url}
                  style={
                    {
                      // backgroundColor: profile?.user_info?.color ?? "orange",
                    }
                  }
                >
                  {getInitials(profile?.company_id?.brand_name)}
                </Avatar>
              </div>
            </Dropdown>
          </Row>
          <Row>
            <h3 style={{ color: "#444" }}>{profile?.company_id?.brand_name}</h3>
          </Row>
        </div>
        <div
          style={{
            flex: 7,
            overflowY: "auto",
            paddingRight: "26px",
          }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={profile?.company_id}
            onFinish={(values) => {
              console.log(values);
              save(values);
            }}
            onFieldsChange={() => {
              setIsFormDirty(form.isFieldsTouched());
            }}
          >
            <Form.Item
              name="brand_name"
              label="Brand Name"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Brand name is required",
                },
              ]}
            >
              <Input size="large"></Input>
            </Form.Item>
            <Form.Item
              name="business_name"
              label="Business/Legal Name"
              rules={[{ required: true }]}
            >
              <Input size="large"></Input>
            </Form.Item>
            <Title level={4}>Office Address</Title>
            <Form.Item name={["address", "line1"]} label="Street Address">
              <Input
                autoComplete="street-address"
                size="large"
                placeholder="Enter street address"
              ></Input>
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name={["address", "city"]} label="City">
                  <Input
                    autoComplete="address-level2"
                    size="large"
                    placeholder="Enter city"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["address", "state"]} label="State">
                  <Input
                    autoComplete="address-level1"
                    size="large"
                    placeholder="Enter state"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name={["address", "zipcode"]}
                  label="Postal / Zip code"
                >
                  <Input
                    autoComplete="postal-code"
                    size="large"
                    placeholder="Enter postal code"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["address", "country"]} label="Country">
                  <Input
                    autoComplete="country-name"
                    size="large"
                    placeholder="Enter country"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <Title level={4} style={{ marginTop: "0" }}>
              Primary Contact
            </Title>
            <Form.Item name={["primary_contact", "name"]} label="Name">
              <Input
                autoComplete="name"
                size="large"
                placeholder="Enter full name"
              ></Input>
            </Form.Item>
            <Form.Item name={["primary_contact", "email"]} label="Email">
              <Input
                autoComplete="email"
                size="large"
                placeholder="Enter email"
              ></Input>
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name={["primary_contact", "phone_number"]}
                  label="Mobile Number"
                >
                  <Input
                    autoComplete="tel"
                    size="large"
                    placeholder="Enter mobile number"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={["primary_contact", "whatsapp_number"]}
                  label="Whatsapp Number"
                >
                  <Input
                    autoComplete="tel"
                    size="large"
                    placeholder="Enter whatsapp number"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div
        style={{
          padding: "30px 90px",
          background: "white",
          boxShadow: "0px 0px 40px rgba(17, 17, 26, 0.1)",
        }}
      >
        <Row
          justify="end"
          align="middle"
          gutter={12}
          style={{ paddingRight: "26px" }}
        >
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
        </Row>
      </div>
    </div>
  );
};

export default CompanySettings;
