import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "./initial-data";
import DayRow from "./DayRow";
import {
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  message,
  notification,
  Row,
  Spin,
  Typography,
} from "antd";
import AddDayComponentDrawer from "Components/AddDayComponent/AddDayComponentDrawer";
import ItineraryService from "services/ItineraryService";
import { PhoneOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;

class DaysList extends React.PureComponent {
  render() {
    const { day, componentMap, index, addDayComponent, refresh, startDate } =
      this.props;
    const dayComponents = day.componentIds.map((componentId) => {
      return componentMap[componentId];
    });
    return (
      <DayRow
        day={day}
        key={index}
        dayComponents={dayComponents}
        index={index}
        addDayComponent={addDayComponent}
        startDate={startDate}
        refresh={refresh}
      />
    );
  }
}

class ItineraryBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOrder: [],
      dayComponents: {},
      days: {},
      loading: true,
      focusDayId: "-1",
      addComponentDrawerOpen: false,
      unconfirmedState: {
        ucf: {},
        count: 0,
      },
    };
  }

  setLoading = (status) => {
    this.setState({ loading: status });
  };

  refresh = async () => {
    this.setLoading(true);
    let resp = await ItineraryService.getItinerary(this.props.id);
    if (resp.success) {
      console.log("resp.data", resp.data);
      let newState = { ...this.state, ...resp.data };
      console.log("state", newState);
      let jsonStr = JSON.stringify(resp.data);
      let jsonObj = JSON.parse(jsonStr);
      let unconfirmedState = {
        ucf: { ...jsonObj },
        count: 0,
      };
      resp.data.dayOrder.forEach((dayId, j) => {
        const newDayStr = JSON.stringify(resp.data.days[dayId]);
        const newDayObj = JSON.parse(newDayStr);
        let newDay = {
          ...newDayObj,
          componentIds: [],
        };
        unconfirmedState.ucf.days[dayId] = { ...newDay };
        resp.data.days[dayId]?.componentIds.forEach((c, k) => {
          let comp = resp.data.dayComponents[c];
          if (comp.status == "UNCONFIRMED" && !comp.is_deleted) {
            unconfirmedState.ucf.days[dayId].componentIds.push(c);
            if (comp?.checkin_or_checkout != "CHECKOUT")
              unconfirmedState.count = unconfirmedState.count + 1;
          }
        });
      });
      console.log("unconfirmedState", unconfirmedState);
      newState = { ...newState, unconfirmedState: { ...unconfirmedState } };
      this.setState(newState);
      this.props.setCartCount(unconfirmedState.count);
    } else {
      message.error(resp.error);
    }
    this.setLoading(false);
  };

  addExtraDay = async (position) => {
    this.setLoading(true);
    let resp = await ItineraryService.addExtraDay({
      itineraryId: this.props._id,
      position,
    });
    if (resp.success) {
      this.refresh();
    } else {
      message.error(resp.error);
    }
    this.setLoading(false);
  };

  sendMarketplaceRequest = async () => {
    this.setLoading(true);
    let resp = await ItineraryService.sendRequestToVendors({
      unconfirmed: this.state?.unconfirmedState?.ucf,
    });
    if (resp.success)
      this.props.showNotification({
        title: "Vendor request sent successfully.",
        description:
          "We'll let you know when they reply or confirm your request.",
        placement: "top",
      });
    else message.error(resp.error);
    this.refresh();
  };

  componentDidMount() {
    this.refresh();
  }

  onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    try {
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "day") {
        console.log("day was moved");
        const newDayOrder = Array.from(this.state.dayOrder);
        newDayOrder.splice(source.index, 1);
        newDayOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...this.state,
          dayOrder: newDayOrder,
        };
        this.setState(newState);
        let resp = await ItineraryService.updateItinerary({
          id: this.props.id,
          payload: { days: newDayOrder },
        });
        if (!resp.success) message.error(resp.error);
        this.refresh(true);
        return;
      }

      const home = this.state.days[source.droppableId];
      const foreign = this.state.days[destination.droppableId];

      if (home === foreign) {
        console.log("within same day move");
        const newComponentIds = Array.from(home.componentIds);
        newComponentIds.splice(source.index, 1);
        newComponentIds.splice(destination.index, 0, draggableId);

        let resp = await ItineraryService.updateDay({
          _id: home._id,
          payload: { components: newComponentIds },
        });
        if (!resp.success) message.error(resp.error);
        this.refresh();

        // const newHome = {
        //   ...home,
        //   componentIds: newComponentIds,
        // };

        // const newState = {
        //   ...this.state,
        //   days: {
        //     ...this.state.days,
        //     [newHome._id]: newHome,
        //   },
        // };

        // this.setState(newState);
        return;
      }

      // moving from one list to another
      const homeComponentIds = Array.from(home.componentIds);
      homeComponentIds.splice(source.index, 1);
      const newHome = {
        ...home,
        componentIds: homeComponentIds,
      };

      const foreignComponentIds = Array.from(foreign.componentIds);
      foreignComponentIds.splice(destination.index, 0, draggableId);
      const newForeign = {
        ...foreign,
        componentIds: foreignComponentIds,
      };

      let resp = await ItineraryService.updateDay({
        _id: home._id,
        payload: { components: homeComponentIds },
      });
      if (!resp.success) message.error(resp.error);

      resp = await ItineraryService.updateDay({
        _id: foreign._id,
        payload: { components: foreignComponentIds },
      });
      if (!resp.success) message.error(resp.error);

      if (this.state.dayComponents[draggableId].type == "STAY") {
        let stayId = this.state.dayComponents[draggableId].id;
        let startIndex;
        let endIndex;
        this.state.dayOrder.every((dayId, i) => {
          this.state.days[dayId].componentIds.every((componentId, j) => {
            let comp = this.state.dayComponents[componentId];
            if (comp.id == stayId) {
              if (startIndex == null) {
                startIndex = i;
                return true;
              }
              if (endIndex == null) {
                endIndex = i;
                return false;
              }
              return false;
            }
          });
          if (startIndex == null || endIndex == null) return true;
          return false;
          // let occurrence = this.state.days[dayId].components.filter(id => id === draggableId).length;
          // if(startIndex!=null && endIndex!=null){
          //   return false;
          // }
          // if(startIndex!=null && endIndex==null && occurrence==1){
          //   endIndex=i;
          //   return false;
          // }
          // if(occurrence==2){
          //   startIndex=i;
          //   endIndex=i;
          //   return false;
          // }
          // if(occurrence==1){
          //   startIndex=i;
          // }
          // return true;
        });
        console.log("indexes", startIndex, endIndex);
      }

      this.refresh();
      // const newState = {
      //   ...this.state,
      //   days: {
      //     ...this.state.days,
      //     [newHome._id]: newHome,
      //     [newForeign._id]: newForeign,
      //   },
      // };
      // this.setState(newState);

      console.log("state", this.state);
    } catch (error) {
      console.log(error);
    }
  };

  showAddDayComponentDrawer = (dayId) => {
    console.log(dayId);
    this.setState({
      ...this.state,
      focusDayId: dayId,
      addComponentDrawerOpen: true,
    });
    console.log(this.state.focusDayId);
  };
  onCloseDayComponentDrawer = async (data) => {
    this.setState({
      ...this.state,
      focusDayId: -1,
      addComponentDrawerOpen: false,
    });
    console.log("add component drawer returned data", data);
    if (data) {
      this.setLoading(true);
      console.log("add data", data);
      const resp = await ItineraryService.addDayComponent({
        type: data.type,
        dayId: this.state.focusDayId,
        data: data.data,
      });
      console.log("resp", resp);
      if (resp.success) {
        this.refresh();
      } else {
        message.error(resp.error);
      }
      this.setLoading(false);
    }
  };

  render() {
    return (
      <>
        {this.state.focusDayId != -1 && this.state.addComponentDrawerOpen ? (
          <AddDayComponentDrawer
            open={this.state.addComponentDrawerOpen}
            onClose={this.onCloseDayComponentDrawer}
          />
        ) : (
          <></>
        )}
        {this.props.cartDrawerOpen && (
          <Drawer
            title="Cart Items"
            footer={null}
            open={this.props.cartDrawerOpen}
            onClose={() => {
              this.props.setCartDrawerOpen(false);
            }}
          >
            {}
          </Drawer>
        )}
        {this.state.loading ? (
          <Spin style={{ width: "100%", height: "200px" }} />
        ) : (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="all-days" type="day">
              {(provided) => (
                <Container {...provided.droppableProps} ref={provided.innerRef}>
                  <Button
                    type="dashed"
                    style={{ width: "100%" }}
                    onClick={() => {
                      this.addExtraDay("START");
                    }}
                  >
                    Add Day Before
                  </Button>
                  {(this.state?.dayOrder ?? []).map((dayId, index) => {
                    const day = this.state?.days[dayId];
                    return (
                      <DaysList
                        key={day._id}
                        day={day}
                        index={index}
                        componentMap={this.state.dayComponents}
                        startDate={this.state?.info?.start_date_utc}
                        addDayComponent={this.showAddDayComponentDrawer}
                        refresh={this.refresh}
                      />
                    );
                  })}
                  {provided.placeholder}
                  <Button
                    type="dashed"
                    style={{ width: "100%" }}
                    onClick={() => {
                      this.addExtraDay("END");
                    }}
                  >
                    Add Day After
                  </Button>
                </Container>
              )}
            </Droppable>
          </DragDropContext>
        )}
        {this.state.unconfirmedState.count > 0 && (
          <Card
            size="small"
            hoverable
            style={{
              position: "fixed",
              bottom: "90px",
              right: "90px",
              zIndex: 3,
              border: "1px solid gold",
            }}
          >
            <Row gutter={12} align="middle">
              <Col>{this.state.unconfirmedState.count} items in cart</Col>
              <Col>
                <Button
                  loading={this.state.loading}
                  type="primary"
                  onClick={this.sendMarketplaceRequest}
                >
                  Send Quotation Request
                </Button>
              </Col>
            </Row>
          </Card>
        )}
      </>
    );
  }
}

export default ItineraryBuilder;
