import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import { CompassOutlined } from "@ant-design/icons";

import "./map.css";
import { Button, Popover, Space } from "antd";

const LocationPin = ({ text, mapUrl }) => (
  <Popover
    content={
      <Space>
        <>View on Map</>
        <Button
          icon={<CompassOutlined />}
          size="small"
          href={mapUrl}
          target="_blank"
        >
          Go
        </Button>
      </Space>
    }
  >
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  </Popover>
);

const Map = ({ location, zoomLevel }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat}%2C${location.lng}&query_place_id=${location?.place_id}`;
  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAxZdn80w_hSurOzCZ7tAlVF-l5iABzqoA" }}
        center={location}
        zoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
          mapUrl={mapUrl}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
