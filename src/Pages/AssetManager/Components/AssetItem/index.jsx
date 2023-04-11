import attachIcon from '../../Assets/attach.svg';
import delIcon from '../../Assets/bin.svg';
import downloadIcon from '../../Assets/download.svg';
import hotelimg from '../../Assets/hotel.svg';
import './styles.scss';

export default function AssetItem({ item }) {
  const { label, dimensions, size, link } = item;
  return (
    <div className="asset-explorer-item">
      <span className="label">{label}</span>
      <span className="preview">
        <img src={hotelimg} />
      </span>
      <span className="dimensions">{dimensions ? dimensions : ' - '}</span>
      <span className="size">{size}</span>
      <div className="actions">
        <span className="attach">
          <img src={attachIcon} />
        </span>
        <span className="download">
          <img src={downloadIcon} />
        </span>
        <span className="delete">
          <img src={delIcon} />
        </span>
      </div>
    </div>
  );
}
