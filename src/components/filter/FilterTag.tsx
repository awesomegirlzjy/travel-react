import React, { useState } from "react";
import { Tag } from "antd";
const { CheckableTag } = Tag;

interface PropsType {
  onSelect?: () => void;
}

export const FilterTag: React.FC<any> = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked: any) => {
    setChecked(checked);
  };

  return <CheckableTag {...props} checked={checked} onChange={handleChange} />;
};
