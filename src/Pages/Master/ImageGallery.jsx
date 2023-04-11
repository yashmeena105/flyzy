import React, { useEffect, useState } from "react";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Layout, message, Modal, Space, Upload } from "antd";
import { Avatar, Breadcrumb, Col, Row, Tabs } from "antd";
import axios from "axios";
import { data } from "jquery";
import paths from "services/apiConstants";
import { useSelector } from "react-redux";
import { AxiosAll } from "services/NetworkEngine";
import AssetService from "services/AssetService";
import BreadCrumbHeader from "Components/BreadCrumbHeader";
import LaunchIcon from "@mui/icons-material/Launch";
const { Header, Footer, Sider, Content } = Layout;
const { Dragger } = Upload;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const draggerProps = {
  name: "file",
  multiple: false,
  progress: null,
};

const UploadNew = () => {
  const { authuser } = useSelector((state) => state.auth);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [fileList, setFileList] = useState([]);
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
    let resp = await AssetService.deleteAsset({ uid: file?.uid });
    if (!resp.success) message.error(resp.error);
    // refresh();
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
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

  const refresh = async () => {
    let response = await AssetService.getAssets();
    if (response.success) {
      setFileList(response.data);
    } else {
      message.error(response.error);
    }
  };

  useEffect(() => {
    refresh();

    return localStorage.removeItem("uploadUrl");
  }, []);

  return (
    <Layout
      style={{ minHeight: "100vh", overflow: "auto", backgroundColor: "white" }}
    >
      <BreadCrumbHeader config={{ name: "Image Gallery" }} />
      <Space direction="vertical" style={{ width: "100%", padding: "12px" }}>
        <Dragger
          {...draggerProps}
          accept="image/png, image/jpeg, image/svg+xml"
          method="PUT"
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
                  window.location.reload(false);
                }
              })
              .catch((error) => {
                message.error(error.message);
              });
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
        <Upload
          accept="image/png, image/jpeg, image/svg+xml"
          action={uploadUrl}
          method="PUT"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onRemove={handleRemove}
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
      </Space>
      <Modal
        open={previewOpen}
        title={
          <Space>
            {previewTitle}
            <Button
              onClick={() => {
                window.open(previewImage);
              }}
              icon={<LaunchIcon />}
            ></Button>
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
    </Layout>
  );
};
export default UploadNew;
