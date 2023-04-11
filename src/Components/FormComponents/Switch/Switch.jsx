import React, { useState } from 'react';
import './Switch.scss';
export default function Switch({ disabled }) {
  const [checked, setChecked] = useState(false);

  const checkHandler = () => {
    setChecked((prev) => !prev);
  };
  

  return (
    <div onClick={checkHandler} className="custom-switch">
      <div className={checked ? 'toggle on' : 'toggle off'} />
    </div>
  );
}
