import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import SimpleColoredTag from "Components/SimpleColoredTag";
import { color } from "@mui/system";
import icons from "Assets/Icons";
import DateTag from "Components/DateTag";
import RoundedLabel from "Components/RoundedLabel";
import { Box } from "@mui/material";
import "./styles.scss";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Input,
  InputNumber,
  Menu,
  message,
  Modal,
  Rate,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import RequirementTag from "Components/RequirementsTag";
import { FieldTimeOutlined } from "@ant-design/icons";
import { customIcon, noimage } from "utils/constants";
import { MoreOutlined, SmileOutlined } from "@ant-design/icons";
import ItineraryService from "services/ItineraryService";
const { Text, Paragraph } = Typography;

const Container = styled.div`
  margin-bottom: 8px;
  border-radius: 20px;
  background-color: ${(props) => (props.isDragging ? "lightblue" : "white")};
  height: min-content;
`;

const getStatusBadge = (status) => {
  switch (status) {
    case "UNCONFIRMED":
      return (
        <Tooltip
          title={
            <div style={{ color: "white" }}>
              <Row>
                <div style={{ fontWeight: "bold" }}>Added from Marketplace</div>
              </Row>
              <Row>
                <div>
                  Send a quotation request to the vendor to confirm this item
                </div>
              </Row>
            </div>
          }
        >
          <Badge status="error" />
        </Tooltip>
      );
    case "CONFIRMED":
      return (
        <Tooltip title="Own Inventory">
          <Badge status="success" />
        </Tooltip>
      );
    case "OWN":
      return (
        <Tooltip title="Own Inventory">
          <Badge status="success" />
        </Tooltip>
      );

    case "REQUESTED_PROPOSAL":
      return (
        <Tooltip
          title={
            <div style={{ color: "white" }}>
              <Row>
                <div style={{ fontWeight: "bold" }}>Proposal Requested</div>
              </Row>
              <Row>
                <div>We'll let you know when a quotation is received</div>
              </Row>
            </div>
          }
        >
          <Badge status="processing" />
        </Tooltip>
      );
    case "RECEIVED_PROPOSAL":
      return (
        <Tooltip title="Proposal Received">
          <Badge status="processing" color="orange" />
        </Tooltip>
      );
    default:
      return <></>;
  }
};
const ComponentCard = ({ data, onEdit, onDelete }) => {
  const items = [
    {
      key: "EDIT",
      label: <a onClick={onEdit}>Edit</a>,
    },
    {
      key: "DELETE",
      danger: true,
      label: <a onClick={onDelete}>Delete</a>,
    },
  ];
  const img =
    data?.master_component?.images?.length > 0
      ? data?.master_component?.images[0]
      : "";
  switch (data.type) {
    case "FLIGHT":
      return (
        <Card
          size="small"
          style={{ width: "240px", height: "180px" }}
          title={<RequirementTag requirement={"FLIGHT"} />}
          extra={
            (data.time_as_text ?? "").length ? (
              <Tag icon={<FieldTimeOutlined />}>{data.time_as_text}</Tag>
            ) : (
              <></>
            )
          }
        >
          <Row gutter={[6, 6]} align="top">
            <Col span={20}>
              <Space size="5px" direction="vertical">
                <Text strong>From:</Text>
                <Text
                  ellipsis={{
                    tooltip: `${data.flight_search_params.to.airport_name}`,
                  }}
                >
                  {data.flight_search_params.from.airport_name}
                </Text>
                <Text strong>To:</Text>
                <Text
                  ellipsis={{
                    tooltip: `${data.flight_search_params.to.airport_name}`,
                  }}
                >
                  {data.flight_search_params.to.airport_name}
                </Text>
              </Space>
            </Col>
            <Col span={4}>
              {customIcon({ src: icons.flight, height: "100%" })}
            </Col>
          </Row>
        </Card>
      );
    case "STAY":
      return (
        <Card
          size="small"
          style={{ width: "260px" }}
          title={
            <Row align="middle" gutter={12}>
              <Col>{getStatusBadge(data?.status)}</Col>
              <Col>
                <RequirementTag requirement={"STAY"} />
              </Col>
            </Row>
          }
          extra={
            <Row align="middle">
              <Col>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  arrow
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />}></Button>
                </Dropdown>
              </Col>
            </Row>
          }
        >
          <Row gutter={[6, 6]} wrap={false}>
            <Col>
              <Image
                style={{
                  borderRadius: "12px",
                  display: "inline-block",
                  width: "40px",
                  height: "40px",
                }}
                src={img ?? "error"}
                fallback={noimage}
              />
            </Col>
            <Col flex="auto">
              {data?.checkin_or_checkout == "CHECKIN"
                ? "Check-In"
                : "Check-Out"}
              <Paragraph
                strong
                style={{ fontSize: "16px", marginBottom: "0" }}
                ellipsis={{
                  rows: 2,
                  tooltip: `${data.master_component?.name}`,
                }}
              >
                {data.master_component.name}
              </Paragraph>
            </Col>
          </Row>
          {data?.checkin_or_checkout == "CHECKIN" && (
            <Row gutter={[6, 6]}>
              <Col span={24}>
                <Text
                  ellipsis={{
                    tooltip: `${
                      JSON.parse(
                        data.master_component?.destination?.value ?? "{}"
                      )?.formatted_address
                    }`,
                  }}
                >
                  {
                    JSON.parse(
                      data.master_component?.destination?.value ?? "{}"
                    )?.formatted_address
                  }
                </Text>
              </Col>
            </Row>
          )}
          {data?.checkin_or_checkout != "CHECKIN" ? (
            <></>
          ) : data.master_component?.stars ? (
            <Row gutter={[6, 6]} align="middle">
              <Col>
                {data.master_component?.stars}
                <span style={{ color: "gold" }}>★ </span>
              </Col>
              <Col>•</Col>
              <Col>
                <Tag style={{ borderRadius: "50px" }}>
                  {data.master_component?.type}
                </Tag>
              </Col>
            </Row>
          ) : (
            <Tag style={{ borderRadius: "50px" }}>
              {data.master_component?.type}
            </Tag>
          )}
          {data?.checkin_or_checkout == "CHECKIN" && (
            <Row gutter={[6, 6]} align="middle" justify="end">
              <Col>
                {(data?.items_selected ?? []).reduce(function (count, item) {
                  return count + item.quantity;
                }, 0)}{" "}
                Rooms -
              </Col>
              <Col>
                ₹
                {(data?.items_selected ?? []).reduce(function (count, item) {
                  return count + item.quantity * item.price;
                }, 0)}{" "}
                / night
              </Col>
            </Row>
          )}
        </Card>
      );
    case "ACTIVITY":
      return (
        <Card
          size="small"
          style={{ width: "260px" }}
          title={
            <Row align="middle" gutter={12}>
              <Col>{getStatusBadge(data?.status)}</Col>
              <Col>
                <RequirementTag requirement={"ACTIVITY"} />
              </Col>
            </Row>
          }
          extra={
            <Row align="middle">
              <Col>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  arrow
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />}></Button>
                </Dropdown>
              </Col>
            </Row>
          }
        >
          <Row gutter={[6, 6]} wrap={false}>
            <Col>
              <Image
                style={{
                  borderRadius: "12px",
                  display: "inline-block",
                  width: "40px",
                  height: "40px",
                }}
                src={img ?? "error"}
                fallback={noimage}
              />
            </Col>
            <Col flex="auto">
              <Paragraph
                strong
                style={{ fontSize: "16px", marginBottom: "0" }}
                ellipsis={{
                  rows: 2,
                  tooltip: `${data.master_component?.name}`,
                }}
              >
                {data.master_component.name}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[6, 6]}>
            <Col span={24}>
              <Text
                ellipsis={{
                  tooltip: `${
                    JSON.parse(
                      data.master_component?.destination?.value ?? "{}"
                    )?.formatted_address
                  }`,
                }}
              >
                {
                  JSON.parse(data.master_component?.destination?.value ?? "{}")
                    ?.formatted_address
                }
              </Text>
            </Col>
          </Row>

          <Row gutter={[6, 6]} align="middle" justify="end">
            <Col>
              {(data?.items_selected ?? []).reduce(function (count, item) {
                return count + item.quantity;
              }, 0)}{" "}
              Packages -
            </Col>
            <Col>
              ₹
              {(data?.items_selected ?? []).reduce(function (count, item) {
                return count + item.quantity * item.price;
              }, 0)}
            </Col>
          </Row>
        </Card>
      );
    case "TRANSPORT":
      return (
        <Card
          size="small"
          style={{ width: "260px" }}
          title={
            <Row align="middle" gutter={12}>
              <Col>{getStatusBadge(data?.status)}</Col>
              <Col>
                <RequirementTag requirement={"TRANSPORT"} />
              </Col>
            </Row>
          }
          extra={
            <Row align="middle">
              <Col>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  arrow
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />}></Button>
                </Dropdown>
              </Col>
            </Row>
          }
        >
          <Row gutter={[6, 6]} wrap={false}>
            <Col>
              <Image
                style={{
                  borderRadius: "12px",
                  display: "inline-block",
                  width: "40px",
                  height: "40px",
                }}
                src={img ?? "error"}
                fallback={noimage}
              />
            </Col>
            <Col flex="auto">
              <Paragraph
                strong
                style={{ fontSize: "16px", marginBottom: "0" }}
                ellipsis={{
                  rows: 2,
                  tooltip: `${data.master_component?.name}`,
                }}
              >
                {data.master_component?.name}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[6, 6]}>
            <Col span={24}>
              <Text
                ellipsis={{
                  tooltip: `${
                    JSON.parse(
                      data.master_component?.destination?.value ?? "{}"
                    )?.formatted_address
                  }`,
                }}
              >
                {
                  JSON.parse(data.master_component?.destination?.value ?? "{}")
                    ?.formatted_address
                }
              </Text>
            </Col>
          </Row>

          <Row gutter={[6, 6]} align="middle" justify="end">
            <Col>
              {(data?.items_selected ?? []).reduce(function (count, item) {
                return count + item.quantity;
              }, 0)}{" "}
              Packages -
            </Col>
            <Col>
              ₹
              {(data?.items_selected ?? []).reduce(function (count, item) {
                return count + item.quantity * item.price;
              }, 0)}
            </Col>
          </Row>
        </Card>
      );
    case "VISA":
      return (
        <Card
          size="small"
          style={{ width: "260px" }}
          title={
            <Row align="middle" gutter={12}>
              <Col>{getStatusBadge(data?.status)}</Col>
              <Col>
                <RequirementTag requirement={"VISA"} />
              </Col>
            </Row>
          }
          extra={
            <Row align="middle">
              <Col>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  arrow
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />}></Button>
                </Dropdown>
              </Col>
            </Row>
          }
        >
          <Row gutter={[6, 6]} wrap={false}>
            <Col>
              <Image
                style={{
                  borderRadius: "12px",
                  display: "inline-block",
                  width: "40px",
                  height: "40px",
                }}
                src={img ?? "error"}
                fallback={noimage}
              />
            </Col>
            <Col flex="auto">
              <Paragraph
                strong
                style={{ fontSize: "16px", marginBottom: "0" }}
                ellipsis={{
                  rows: 2,
                  tooltip: `${data.master_component?.name}`,
                }}
              >
                {data.master_component.name}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[6, 6]}>
            <Col span={24}>
              <Text
                ellipsis={{
                  tooltip: `${
                    JSON.parse(
                      data.master_component?.destination?.value ?? "{}"
                    )?.formatted_address
                  }`,
                }}
              >
                {
                  JSON.parse(data.master_component?.destination?.value ?? "{}")
                    ?.formatted_address
                }
              </Text>
            </Col>
          </Row>

          <Row gutter={[6, 6]} align="middle" justify="end">
            <Col>
              {(data?.items_selected ?? []).reduce(function (count, item) {
                return count + item.quantity;
              }, 0)}{" "}
              Packages -
            </Col>
            <Col>
              ₹
              {(data?.items_selected ?? []).reduce(function (count, item) {
                return count + item.quantity * item.price;
              }, 0)}
            </Col>
          </Row>
        </Card>
      );
    default:
      return <></>;
  }
};

export default class DayComponent extends React.Component {
  state = {
    showEditModal: false,
    selectedItems: this.props.dayComponent?.items_selected ?? [],
  };

  saveQuantity = async (data) => {
    const payload = {
      id: data.id,
      items_selected: data.items_selected,
      type: data.type,
    };
    console.log(data);
    this.setState({ ...this.state, showEditModal: false });
    let resp = await ItineraryService.updateDayComponent(payload);
    if (!resp.success) message.error(resp.error);
    this.props.refresh();
  };
  render() {
    return (
      <>
        {this.state.showEditModal && (
          <Modal
            open={this.state.showEditModal}
            title={
              "Edit " + this.props.dayComponent?.master_component?.name ?? "NA"
            }
            onCancel={() => {
              this.setState({ showEditModal: false });
            }}
            onOk={() => {
              console.log(this.state.selectedItems);
              this.props.dayComponent.items_selected = this.state.selectedItems;
              this.saveQuantity(this.props.dayComponent);
            }}
          >
            <Space size="small" direction="vertical" style={{ width: "100%" }}>
              {this.state.selectedItems.map((item, j) => {
                return (
                  <Card
                    title={item.name}
                    size="small"
                    extra={
                      <Input.Group compact>
                        <Button size="small">-</Button>
                        <InputNumber
                          style={{ width: "50px" }}
                          min={0}
                          max={100}
                          size="small"
                          defaultValue={item?.quantity ?? 0}
                          onChange={(e) => {
                            console.log(e);
                            let newItemData = this.state.selectedItems;
                            newItemData[j].quantity = e;
                            this.setState({
                              ...this.state,
                              selectedItems: newItemData,
                            });
                          }}
                        />
                        <Button size="small">+</Button>
                      </Input.Group>
                    }
                  >
                    <Row>
                      <Text>{item.inclusions}</Text>
                    </Row>
                    <Row justify="end">
                      <Col>
                        {item?.is_negotiable ? (
                          <Tag color="green">Negotiable price</Tag>
                        ) : (
                          <Tag color="orange">Non-Negotiable price</Tag>
                        )}{" "}
                        ₹{item.price}
                      </Col>
                    </Row>
                  </Card>
                );
              })}
              <Card size="small">
                <Row justify="end">
                  <Col>
                    <Text strong>
                      Total: ₹
                      {this.state.selectedItems.reduce(function (sum, item) {
                        return sum + item.price * item.quantity;
                      }, 0)}
                    </Text>
                  </Col>
                </Row>
              </Card>
            </Space>
          </Modal>
        )}
        <Draggable
          draggableId={this.props.dayComponent?._id}
          index={this.props.index}
        >
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <ComponentCard
                data={this.props.dayComponent}
                onEdit={() => {
                  this.setState({ showEditModal: true });
                }}
                onDelete={async () => {
                  let resp = await ItineraryService.deleteDayComponent(
                    this.props.dayComponent
                  );
                  if (!resp.success) message.error(resp.error);
                  this.props.refresh();
                }}
              />
            </Container>
          )}
        </Draggable>
      </>
    );
  }
}
