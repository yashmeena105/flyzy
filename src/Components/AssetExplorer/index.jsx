import * as React from 'react';
import './styles.scss';
import delIcon from '../../bin.svg';

export default function AssetExplorer() {
  const items = [
    {
      label: 'Taj Vivanta Bedroom Luxury Sui...png',
      preview: '',
      dimenisons: '77x88 px',
      size: '740KB',
      link: '(link)',
    },
    {
      label: 'OLA Pass.pdf',
      preview: '',
      dimenisons: ' - ',
      size: '1.2MB',
      link: '(link)',
    },
    {
      label: 'Radisson blue Guwhati Building.jpg',
      preview: '',
      dimenisons: '90x98 px',
      size: '1.9MB',
      link: '(link)',
    },
  ];

  return (
    <div className="asset-explorer-page">
      <div className="asset-explorer-heading">
        <h1>Asset explorer</h1>
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
          <span className="link"></span>
          <span className="del"></span>
        </div>
        {items.map((item) => {
          return <AssetExplorerItem item={item} />;
        })}
      </div>
    </div>
  );
}

function AssetExplorerItem({ item }) {
  return (
    <div className="asset-explorer-item">
      <span className="label">{item.label}</span>
      <span className="preview">
        <img src="https://unsplash.com/photos/ECOzJdT4OIk" />
      </span>
      <span className="dimensions">{item.dimenisons}</span>
      <span className="size">{item.size}</span>
      <span className="link">
        {' '}
        <span>{item.link}</span>
      </span>
      <span className="del">
        <img src={delIcon} />
      </span>
    </div>
  );
}
