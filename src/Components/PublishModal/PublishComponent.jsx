import React, { useState } from "react";
import { Button, Divider, InputNumber, Modal, Row, Typography } from "antd";
import ItineraryService from "services/ItineraryService";
import MasterService from "services/MasterService";

const { Paragraph } = Typography;

const PublishModal = ({
  open,
  onClose,
  _id,
  id,
  is_published = false,
  type,
  price_per_person,
  content,
}) => {
  const [price, setPrice] = useState(price_per_person);
  const handleOk = async () => {
    const status = is_published ? false : true;
    switch (type) {
      case "STAY":
        await ItineraryService.updateMasterStay({
          payload: { id, is_published: status },
        });
        break;
      case "TRANSPORT":
        await ItineraryService.updateMasterTransport({
          payload: { _id, is_published: status },
        });
        break;
      case "ACTIVITY":
        await ItineraryService.updateMasterActivity({
          payload: { _id, is_published: status },
        });
        break;

      case "VISA":
        await MasterService.updateMasterVisa({
          payload: { _id, is_published: status },
        });
        break;
      case "ITINERARY":
        await ItineraryService.updateItinerary({
          payload: { is_published: status, price_per_person: price },
          id: id,
        });
        break;
      default:
        break;
    }
    onClose(false);
  };
  const handleCancel = () => {
    onClose(false);
  };
  const article =
    "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life";

  return (
    <Modal
      title="Publish your listing to ZERO Marketplace"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={is_published ? "Unpublish" : "Publish & Open for sale"}
      okType="primary"
      width="800px"
    >
      {type == "ITINERARY" ? (
        <>
          <Row>Price per person</Row>
          <Row>
            <InputNumber
              onChange={(v) => {
                setPrice(v);
              }}
              value={price}
              placeholder="Set a price"
              min={0}
            />
          </Row>
        </>
      ) : (
        <></>
      )}
      {content}
    </Modal>
  );
};

export default PublishModal;
