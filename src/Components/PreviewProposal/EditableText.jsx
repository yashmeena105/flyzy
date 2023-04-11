import React, { useState } from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

const EditableText = ({ style, children }) => {
  const [val, setVal] = useState(children);
  return (
    <Paragraph
      editable={{
        onChange: setVal,
      }}
      style={{ ...style, display: "inline" }}
    >
      {val}
    </Paragraph>
  );
};

export default EditableText;
