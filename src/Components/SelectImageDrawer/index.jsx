import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Empty,
  Image,
  message,
  Modal,
  Space,
  Spin,
  Typography,
} from "antd";
import { async } from "@firebase/util";
import MasterService from "services/MasterService";
import AssetService from "services/AssetService";
import { noimage } from "utils/constants";

const { Text } = Typography;

const SelectImageDrawer = ({ open, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const refresh = async () => {
    setLoading(true);
    const resp = await AssetService.getAssets();
    if (resp.success) {
      console.log("images", resp.data);
      setImageList(resp.data);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleOk = () => {
    onClose(selectedImage);
  };

  const imageCards = () => {
    return imageList.length;
    // return imageList.map((f) => <Image src={f?.url} fallback={noimage} />);
  };

  return (
    <>
      <Drawer title="Select Image" open={open} onClose={onClose}>
        <Space>
          {imageList.length ? (
            <Space
              size={"small"}
              style={{
                width: "100%",
                padding: "6px 12px",
              }}
            >
              {imageCards}
            </Space>
          ) : (
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
          )}
        </Space>
      </Drawer>
    </>
  );
};
export default SelectImageDrawer;
