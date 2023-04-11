import { Tag } from "antd";
import React from "react";
import { getRequirementColor, getRequirementIcon } from "utils/constants";
const RequirementTag = ({ requirement }) => {
  return (
    <Tag
      color={getRequirementColor(requirement)}
      icon={getRequirementIcon(requirement)}
    >
      {requirement}
    </Tag>
  );
};

export default RequirementTag;
