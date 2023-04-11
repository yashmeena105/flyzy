import React, { useState } from 'react';
import './AssetUploadingItem.scss';

export default function ({ item }) {
  const { label, dimensions, size } = item;
  return (
    <div className="asset-uploading-item">
      <span className="label">{label}</span>
      <div className="uploading-status">
        <span>Uploading ...</span>
      </div>

      <span className="dimensions">{dimensions ? dimensions : ' - '}</span>
      <span className="size">{size}</span>
      <div className="actions"></div>
    </div>
  );
}
