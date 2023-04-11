import React from "react";
import { getRequirementColor, noimage } from "utils/constants";
import { Typography } from "antd";
import {
  HomeFilled,
  CarOutlined,
  FileProtectOutlined,
  CrownOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import EditableText from "./EditableText";

const { Title, Text, Paragraph } = Typography;

const ComponentPreview = ({ data, readonly = true }) => {
  console.log("data", data);
  let img = null;
  let imgs = data?.master_component?.images ?? [];
  if (imgs?.length > 0) img = imgs[0];
  let full = data?.checkin_or_checkout == "CHECKIN";

  const getCheckinString =
    (full ? "Checkin to " : "Checkout from ") + data?.master_component?.name;

  switch (data.type) {
    case "STAY":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>
            <HomeOutlined style={{ color: full ? "#FF617D" : "gray" }} />
            <EditableText style={{ fontWeight: "bold", fontSize: "inherit" }}>
              {getCheckinString}
            </EditableText>
          </span>
          {img && full && (
            <img
              src={img}
              style={{
                objectFit: "cover",
                width: "90%",
                height: "160px",
                padding: "6px 0",
                borderRadius: "12px",
              }}
            ></img>
          )}
          {data?.items_selected?.length > 0 && full && (
            <EditableText style={{ fontWeight: "bold" }}>Rooms</EditableText>
          )}
          {full &&
            data?.items_selected?.map((i, j) => (
              <EditableText>{`${j + 1}. ${i.name}`}</EditableText>
            ))}
        </div>
      );
    case "ACTIVITY":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>
            <CrownOutlined style={{ color: getRequirementColor(data.type) }} />
            <EditableText style={{ fontWeight: "bold", fontSize: "inherit" }}>
              {data?.master_component?.name}
            </EditableText>
          </span>
          {img && (
            <img
              src={img}
              style={{
                objectFit: "cover",
                width: "90%",
                height: "160px",
                padding: "6px 0",
                borderRadius: "12px",
              }}
            ></img>
          )}
          {data?.items_selected?.length > 0 && (
            <EditableText>Notes</EditableText>
          )}
          {data?.items_selected?.map((i, j) => {
            console.log("i", i);
          })}
        </div>
      );
    case "TRANSPORT":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>
            <CarOutlined style={{ color: getRequirementColor(data.type) }} />
            <EditableText style={{ fontWeight: "bold", fontSize: "inherit" }}>
              {data?.master_component?.name}
            </EditableText>
          </span>
          {img && (
            <img
              src={img}
              style={{
                objectFit: "cover",
                width: "90%",
                height: "160px",
                padding: "6px 0",
                borderRadius: "12px",
              }}
            ></img>
          )}
          {data?.items_selected?.length > 0 && (
            <EditableText>Notes</EditableText>
          )}
          {data?.items_selected?.map((i, j) => (
            <EditableText>{`${j + 1}. ${i.name}`}</EditableText>
          ))}
        </div>
      );
    case "VISA":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>
            <FileProtectOutlined
              style={{ color: getRequirementColor(data.type) }}
            />
            <EditableText style={{ fontWeight: "bold", fontSize: "inherit" }}>
              {data?.master_component?.name}
            </EditableText>
          </span>
          {img && (
            <img
              src={img}
              style={{
                objectFit: "cover",
                width: "90%",
                height: "160px",
                padding: "6px 0",
                borderRadius: "12px",
              }}
            ></img>
          )}
          {data?.items_selected?.length > 0 && (
            <EditableText>Notes</EditableText>
          )}
          {data?.items_selected?.map((i, j) => (
            <EditableText>{`${j + 1}. ${i.name}`}</EditableText>
          ))}
        </div>
      );
    case "FLIGHT":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>
            <HomeFilled style={{ color: getRequirementColor(data.type) }} />
            <EditableText style={{ fontWeight: "bold", fontSize: "inherit" }}>
              {data?.master_component?.name}
            </EditableText>
          </span>
          {img && (
            <img
              src={img}
              style={{
                objectFit: "cover",
                width: "90%",
                height: "160px",
                padding: "6px 0",
                borderRadius: "12px",
              }}
            ></img>
          )}
          {data?.items_selected?.length > 0 && (
            <EditableText>Notes</EditableText>
          )}
          {data?.items_selected?.map((i, j) => (
            <EditableText>{`${j + 1}. ${i.name}`}</EditableText>
          ))}
        </div>
      );
    default:
      return <></>;
  }
};

export default ComponentPreview;
