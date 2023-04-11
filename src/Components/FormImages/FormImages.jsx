import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import SelectImageModal from "Components/SelectImageModal/SelectImageModal";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const FormImages = ({ value = [], onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectImageModalOpen, setSelectImageModalOpen] = useState("");
  const [fileList, setFileList] = useState(
    value.map((i, j) => {
      return { url: i, uid: j };
    })
  );
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(
      "change",
      fileList.map((f) => {
        return f.url;
      })
    );
    onChange(
      fileList.map((f) => {
        return f.url;
      })
    );
  };
  const handleRemove = () => {
    onChange(
      fileList.map((f) => {
        return f.url;
      })
    );
  };
  const uploadButton = (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectImageModalOpen(true);
        console.log("Upload pressed");
      }}
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Select
      </div>
    </div>
  );

  useEffect(() => {
    console.log("drop");
    onChange(
      fileList.map((f) => {
        return f.url;
      })
    );
  }, [fileList]);

  const onImageModalClose = (image) => {
    setSelectImageModalOpen(false);
    if (image) {
      setFileList([...fileList, image]);
    }
  };
  return (
    <>
      <SelectImageModal
        open={selectImageModalOpen}
        onClose={onImageModalClose}
      />
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={""}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default FormImages;
