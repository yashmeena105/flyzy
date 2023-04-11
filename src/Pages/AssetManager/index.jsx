import React, { useRef, useState } from 'react';
import './styles.scss';
import AssetExplorerItem from './Components/AssetItem';
import AssetUploadingItem from './Components/AssetUploadingItem/AssetUploadingItem';

function AssetManager() {
  const itemsInitData = [
    {
      label: 'Taj Vivanta Bedroom Luxury Sui...png',
      preview: '',
      dimensions: '77x88 px',
      size: '740KB',
      link: '(link)',
    },
    {
      label: 'OLA Pass.pdf',
      preview: '',
      dimensions: ' - ',
      size: '1.2MB',
      link: '(link)',
    },
    {
      label: 'Radisson blue Guwhati Building.jpg',
      preview: '',
      dimensions: '90x98 px',
      size: '1.9MB',
      link: '(link)',
    },
    {
      label: 'Radisson blue Guwhati Building.jpg',
      preview: '',
      dimensions: '90x98 px',
      size: '1.9MB',
      link: '(link)',
    },
  ];

  const uploadingItemsInitData = [
    {
      label: 'OLA Pass.pdf',
      preview: '',
      dimensions: ' - ',
      size: '1.2MB',
      link: '(link)',
    },
    {
      label: 'Radisson blue Guwhati Building.jpg',
      preview: '',
      dimensions: '90x98 px',
      size: '1.9MB',
      link: '(link)',
    },
  ];
  const [assetItems, setAssetItems] = useState(itemsInitData);
  const [uploadingItems, setUploadingItems] = useState(uploadingItemsInitData);
  const inputFile = useRef(null);

  const uploadClickHandler = () => {
    inputFile.current.click();
  };

  const fileUploadhandler = (e) => {
    const file = e.target.files[0];
    console.log('file received', file);
    setUploadingItems((prev) => {
      return [
        {
          label: file.name,
          size: file.size,
          preview: '',
          link: '',
          dimensions: '',
        },
        ...prev,
      ];
    });
  };

  return (
    <div className="asset-manager-main">
      <div className="asset-explorer-heading">
        <h1>Asset Manager</h1>
      </div>
      <div className="asset-explorer-search">
        <input placeholder="Search" />
      </div>
      <div className="asset-explorer-main">
        <div className="asset-explorer-main-heading">
          <span className="label">Label</span>
          <span className="preview">Preview</span>
          <span className="dimensions">Dimensions</span>
          <span className="size">Size</span>
          <span className="actions"></span>
        </div>
        <div className="asset-explorer-items">
          {assetItems.map((item, index) => {
            return <AssetExplorerItem item={item} key={index} />;
          })}
        </div>

        <div className="asset-uploading-items">
          {uploadingItems.map((item, index) => {
            return <AssetUploadingItem item={item} key={index} />;
          })}
        </div>

        <div
          onClick={uploadClickHandler}
          className="asset-image-upload-container"
        >
          <input onChange={fileUploadhandler} ref={inputFile} type="file" />
          <div className="content">
            <span>Drop file here</span>
            <span>OR</span>
            <button className="upload-button">Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetManager;
