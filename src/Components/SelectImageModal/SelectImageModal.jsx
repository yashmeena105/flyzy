import {
  Button,
  Col,
  Empty,
  Image,
  message,
  Modal,
  Row,
  Space,
  Tooltip,
  Upload,
  Typography,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, InboxOutlined, EyeOutlined } from "@ant-design/icons";
import { AxiosAll } from "services/NetworkEngine";
import AssetService from "services/AssetService";
import paths from "services/apiConstants";
import { useSelector } from "react-redux";

const { Dragger } = Upload;
const { Text, Title } = Typography;

const SelectImageModal = ({ open, onClose }) => {
  const [uploadUrl, setUploadUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshImages = async () => {
    setLoading(true);
    let resp = await AssetService.getAssets();
    if (resp.success) {
      console.log("Stay Images", resp.data);
      setImageList(resp.data);
    } else {
      message.error(resp?.error ?? "Something went wrong");
    }
    setLoading(false);
  };

  const { authuser } = useSelector((state) => state.auth);

  useEffect(() => {
    refreshImages();
  }, []);

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

  return (
    <Modal
      title="Select Or Upload Image"
      onCancel={() => onClose(null)}
      open={open}
      width="90vw"
      centered
      footer={[
        <Button key="back" onClick={() => onClose(null)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => onClose(selectedImage)}
        >
          Select
        </Button>,
      ]}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ width: "100px" }}>
          <Spin spinning={loading}>
            <Upload
              accept="image/png, image/jpeg, image/svg+xml"
              action={uploadUrl}
              method="PUT"
              listType="picture-card"
              fileList={[]}
              customRequest={async (options) => {
                const { onSuccess, onError, file, onProgress } = options;
                setLoading(true);
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
                      refreshImages();
                      setLoading(false);
                    }
                  })
                  .catch((error) => {
                    setLoading(false);
                    message.error(error.message);
                  });
              }}
              multiple={false}
              beforeUpload={async (file) => {
                let data = {
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
                  paths?.libraryAsset,
                  data,
                  authuser.uid
                );
                const url = response.data?.uploadUrls[0] ?? "";
                setUploadUrl(url);
                localStorage.setItem("uploadUrl", url);
              }}
            >
              {uploadButton}
            </Upload>
          </Spin>
        </div>
        {imageList.map((i, j) => {
          const isSelected = JSON.stringify(i) == JSON.stringify(selectedImage);
          return (
            <Tooltip
              key={j}
              title={
                <Text style={{ color: "white" }}>{i?.name ?? "Name: NA"}</Text>
              }
            >
              <Image
                preview={false}
                style={{
                  height: "106px",
                  width: "106px",
                  objectFit: "cover",
                  padding: "3px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: isSelected ? "2px solid #0057ad" : "unset",
                }}
                onClick={() => {
                  console.log("pressed", i);
                  setSelectedImage(i);
                }}
                src={i?.url}
              />
            </Tooltip>
          );
        })}
        {/* ) : (
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
        )} */}
      </div>
    </Modal>
  );
};

export default SelectImageModal;
