import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  Collapse,
  Row,
  Col,
  Typography,
  Button,
  Space,
  message,
  Spin,
  Modal,
  Upload,
  Result,
} from "antd";
import { DeleteOutlined, InboxOutlined, PlusOutlined } from "@ant-design/icons";
import LaunchIcon from "@mui/icons-material/Launch";
import { Card } from "antd";
import { AxiosAll } from "services/NetworkEngine";
import paths from "services/apiConstants";
import AssetService from "services/AssetService";
import ItineraryService from "services/ItineraryService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const { Meta } = Card;
const { Panel } = Collapse;

const { Paragraph } = Typography;
const { Dragger } = Upload;
const { Text, Link, Title } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const TripDocuments = () => {
  const { authuser } = useSelector((state) => state.auth);
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const { id } = useParams();
  const leadId = id;
  const [fileList, setFileList] = useState([]);

  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");

  const refresh = async () => {
    setLoading(true);
    let resp = await ItineraryService.getConfirmedItinerary(leadId);
    console.log("itinerary Data", resp.data);
    if (resp.success) {
      setItineraryData(resp.data);
    } else {
      // message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();

    return localStorage.removeItem("uploadUrl");
  }, []);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleRemove = async (file) => {
    console.log("file", file);
    let resp = await AssetService.deleteAsset({ uid: file?.uid });
    if (!resp.success) message.error(resp.error);
    refresh();
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadProps = {
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "Download",
      showRemoveIcon: true,
      removeIcon: (
        <DeleteOutlined
          onClick={(e) => console.log(e, "custom removeIcon event", e)}
        />
      ),
    },
  };

  const componentsTable = (
    <>
      {loading || itineraryData == null ? (
        <Row align="middle" justify="center">
          <Result
            status="404"
            title="No confirmed itineraries yet"
            extra={
              <Button
                onClick={() => navigate(`/leads/${id}/planner`)}
                type="primary"
              >
                See Itineraries
              </Button>
            }
          />
        </Row>
      ) : (
        itineraryData.dayOrder.map((dayId, i) =>
          itineraryData.days[dayId].componentIds.map((componentId, j) => {
            const component = itineraryData.dayComponents[componentId];

            return component?.checkin_or_checkout == "CHECKOUT" ? (
              <></>
            ) : (
              <Row
                key={component._id}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  paddingBottom: "5px",
                }}
                gutter={[8, 8]}
              >
                <Col span={6}>
                  <Space direction="vertical">
                    <Row gutter={6} style={{ fontWeight: "bold" }}>
                      <Col>{`Day ${i + 1} - ${
                        component.master_component?.type ?? component?.type
                      }`}</Col>
                    </Row>
                    <Row gutter={6}>
                      <Col>{component.master_component?.name}</Col>
                    </Row>
                  </Space>
                </Col>
                {component?.booking_documents?.length > 0 && (
                  <Col flex="auto">
                    <Upload
                      listType="picture"
                      fileList={component.booking_documents}
                      onPreview={handlePreview}
                      onRemove={handleRemove}
                      className="upload-list-inline"
                    ></Upload>
                  </Col>
                )}
                <Col>
                  <Button
                    style={{ marginTop: "8px", height: "66px", width: "66px" }}
                    onClick={() => {
                      setSelectedComponent(component);
                      setUploadModalOpen(true);
                    }}
                    type="dashed"
                    icon={<PlusOutlined />}
                  ></Button>
                </Col>
              </Row>
            );
          })
        )
      )}
    </>
  );

  return (
    <>
      {loading && <Spin></Spin>}
      {!loading && (
        <>
          {uploadModalOpen && (
            <Modal
              open={uploadModalOpen}
              onCancel={() => {
                setUploadModalOpen(false);
              }}
              title="Upload new document"
              footer={null}
            >
              <Dragger
                {...uploadProps}
                action={uploadUrl}
                method="PUT"
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
                        setUploadModalOpen(false);
                        refresh();
                      }
                    })
                    .catch((error) => {
                      message.error(error.message);
                    });
                }}
                onChange={handleChange}
                multiple={false}
                beforeUpload={async (file) => {
                  let data = {
                    componentId: selectedComponent?._id,
                    componentType: selectedComponent?.type,
                    assets: [
                      {
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        uid: file.uid,
                      },
                    ],
                  };
                  let response = await AxiosAll(
                    "POST",
                    paths?.uploadComponentAsset,
                    data,
                    authuser.uid
                  );
                  const url = response.data?.uploadUrls[0] ?? "";
                  setUploadUrl(url);
                  localStorage.setItem("uploadUrl", url);
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                {/* <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p> */}
              </Dragger>
            </Modal>
          )}
          <Space
            direction="vertical"
            style={{ width: "100%", padding: "12px" }}
          >
            {!loading && componentsTable}
          </Space>
          <Modal
            width="80vw"
            open={previewOpen}
            title={
              <Space size="large">
                {previewTitle}
                <Button
                  onClick={() => {
                    window.open(previewImage);
                  }}
                >
                  <Row gutter={[8, 6]}>
                    <Col>
                      <LaunchIcon fontSize="small" />
                    </Col>
                    <Col>View</Col>
                  </Row>
                </Button>
              </Space>
            }
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt={previewTitle}
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default TripDocuments;
