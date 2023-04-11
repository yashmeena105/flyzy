import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DayComponent from "./DayComponent";
import icons from "Assets/Icons";
import AddDayComponent from "./AddDayComponentButton";
import { Col, Row, Space, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const Container = styled.div`
  border: 0.5px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;
const Title = styled.div`
  padding: 8px;
  font-weight: 500;
`;
const DayComponentsList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "lightgrey" : "inherit"};

  min-height: 70px;
  display: flex;
  gap: 10px;
`;

class DayComponentList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.dayComponents === this.props.dayComponents) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <Space
        style={{ width: "100%", overflow: "auto", alignItems: "flex-start" }}
      >
        {this.props.dayComponents.map((dayComponent, index) => {
          return (
            <DayComponent
              key={index}
              dayComponent={dayComponent}
              index={index}
              refresh={this.props.refresh}
            />
          );
        })}
        <AddDayComponent
          onClick={() => this.props.addDayComponent(this.props.dayId)}
        />
      </Space>
    );
  }
}

export default class DayRow extends React.Component {
  render() {
    const dayComps = this.props.dayComponents.filter(
      (comp) => comp.is_deleted != true
    );
    return (
      <Draggable draggableId={this.props.day._id} index={this.props.index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <div className="dragrow" {...provided.dragHandleProps}>
              <img src={icons.drag} alt="" className="drag" />
              <Title>Day {this.props.index + 1}</Title>
              {this.props.startDate && (
                <Tag icon={<CalendarOutlined />}>
                  {dayjs(this.props.startDate)
                    .add(this.props.index, "day")
                    .format("ddd D MMM YY")}
                </Tag>
              )}
            </div>
            <Droppable
              droppableId={this.props.day._id}
              type="dayComponent"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <DayComponentsList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <DayComponentList
                    dayComponents={dayComps}
                    addDayComponent={this.props.addDayComponent}
                    dayId={this.props.day._id}
                    refresh={this.props.refresh}
                  />
                  {provided.placeholder}
                </DayComponentsList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
