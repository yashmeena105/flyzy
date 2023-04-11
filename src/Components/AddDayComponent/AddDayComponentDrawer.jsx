import { Button, Card, Drawer, Modal, Row, Col, Space } from "antd";
import icons from "Assets/Icons";
import { useEffect, useState } from "react";
import { customIcon } from "utils/constants";
import AddActivity from "./AddActivity";
import AddFlight from "./AddFlight";
import AddStay from "./AddStay";
import AddTransport from "./AddTransport";
import AddVisa from "./AddVisa";

const { Meta } = Card;

const AddDayComponentDrawer = ({ open, onClose }) => {
  const [childDrawer, setChildDrawer] = useState(false);
  const [componentType, setComponentType] = useState("FLIGHT");

  useEffect(() => {
    console.log("useEffect Called");
  }, []);

  const onFinish = () => {
    onClose(false);
  };
  const showChildDrawer = (type) => {
    setComponentType(type);
    setChildDrawer(true);
  };
  const onChildDrawerClose = () => {
    setChildDrawer(false);
  };

  const getComponents = (type) => {
    switch (type) {
      case "STAY":
        return <AddStay onImport={onClose} />;
      case "FLIGHT":
        return <AddFlight onImport={onClose} />;
      case "ACTIVITY":
        return <AddActivity onImport={onClose} />;
      case "TRANSPORT":
        return <AddTransport onImport={onClose} />;
      case "VISA":
        return <AddVisa onImport={onClose} />;

      default:
        return <></>;
    }
  };
  return (
    <>
      <Modal
        title="Add itinerary component"
        closable={false}
        onCancel={onFinish}
        open={open}
        footer={[
          <Button key="back" onClick={onFinish}>
            Cancel
          </Button>,
        ]}
      >
        <Row gutter={[12, 6]}>
          <Col>
            <Card
              onClick={() => {
                showChildDrawer("STAY");
              }}
              hoverable
              size="small"
              title="Accomodation"
              style={{
                width: 220,
              }}
            >
              <Space>
                <Row justify={"center"}>
                  {customIcon({ src: icons.hotel, height: "80px" })}
                </Row>
                <Meta description="Hotel, Villa, Camping, Homestay etc." />
              </Space>
            </Card>
          </Col>
          <Col>
            <Card
              onClick={() => {
                showChildDrawer("FLIGHT");
              }}
              hoverable
              size="small"
              title="Flight"
              style={{
                width: 220,
              }}
            >
              <Space>
                <Row justify={"center"}>
                  {customIcon({ src: icons.flightroute, height: "80px" })}
                </Row>
                <Meta description="Search flights right from ZERO" />
              </Space>
            </Card>
          </Col>
          <Col>
            <Card
              onClick={() => {
                showChildDrawer("ACTIVITY");
              }}
              hoverable
              size="small"
              title="Activity"
              style={{
                width: 220,
              }}
            >
              <Space>
                <Row justify={"center"}>
                  {customIcon({ src: icons.carousel, height: "80px" })}
                </Row>
                <Meta description="Amusements, Adventure, Dining etc." />
              </Space>
            </Card>
          </Col>
          <Col>
            <Card
              onClick={() => {
                showChildDrawer("TRANSPORT");
              }}
              hoverable
              size="small"
              title="Transportation"
              style={{
                width: 220,
              }}
            >
              <Space>
                <Row justify={"center"}>
                  {customIcon({ src: icons.car, height: "80px" })}
                </Row>
                <Meta description="Private/Shared Transfers, Disposal etc." />
              </Space>
            </Card>
          </Col>
          <Col>
            <Card
              onClick={() => {
                showChildDrawer("VISA");
              }}
              hoverable
              size="small"
              title="VISA"
              style={{
                width: 220,
              }}
            >
              <Space>
                <Row justify={"center"}>
                  {customIcon({ src: icons.visa, height: "80px" })}
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
        <Drawer
          title="Add or browse marketplace"
          width={1000}
          closable={false}
          onClose={onChildDrawerClose}
          open={childDrawer}
        >
          {getComponents(componentType)}
        </Drawer>
      </Modal>
    </>
  );
};
export default AddDayComponentDrawer;
