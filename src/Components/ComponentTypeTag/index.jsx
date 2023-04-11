import { Tag } from "antd";
import icons from "Assets/Icons";
import React from "react";
import { getComponentTypeColor, getComponentTypeIcon } from "utils/constants";
const ComponentTypeTag = ({ componentType }) => {
  return (
    <Tag color={getComponentTypeColor(componentType)}>{componentType}</Tag>
  );
};

export default ComponentTypeTag;
