import { Badge, Layout, message, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LeadService from "services/LeadService";
import ChatRoom from "./ChatRoom";
import VendorChat from "./VendorChat";
import "./styles.css";

const { Header, Footer, Sider, Content } = Layout;

const ChatHome = ({ parentHeight }) => {
  const { id } = useParams();

  const { authuser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(true);
  const [vendorChatRooms, setVendorChatRooms] = useState([]);
  const [customerRoom, setCustomerRoom] = useState(null);
  const [unreadVendorChatrooms, setUnreadVendorChatrooms] = useState(0);
  const [unreadCustomerMessages, setUnreadCustomerMessages] = useState(0);

  const refresh = async () => {
    setLoading(true);
    let resp = await LeadService.getChatRooms(id);
    if (resp.success) {
      let rooms = resp.data ?? [];
      let vRooms = [];
      rooms.map((r, j) => {
        console.log(r);
        if (r?.company_id?._id == profile?.company_id._id) {
          setCustomerRoom(r);
          if ("read_timestamps" in r)
            if (r?.read_timestamps[authuser.uid] != r?.latest_timestamp) {
              setUnreadCustomerMessages(unreadCustomerMessages + 1);
            }
        } else {
          console.log("vroom", r);
          if ("read_timestamps" in r)
            if (r?.read_timestamps[authuser.uid] != r?.latest_timestamp) {
              setUnreadCustomerMessages(unreadCustomerMessages + 1);
            }
          vRooms.push(r);
        }
      });
      setVendorChatRooms(vRooms);
    } else {
      message.error(resp.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("height", parentHeight);
    refresh();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Tabs
        defaultActiveKey="CUSTOMER"
        tabPosition="left"
        items={[
          {
            label: (
              <Badge size="small" count={unreadCustomerMessages}>
                <div style={{ paddingRight: "8px" }}>Customer</div>
              </Badge>
            ),
            key: "CUSTOMER",
            children: customerRoom?._id && (
              <Spin spinning={loading}>
                <ChatRoom
                  room={customerRoom}
                  user={{
                    ...authuser,
                    name: profile?.user_info?.display_name,
                  }}
                  parentHeight={parentHeight}
                />
              </Spin>
            ),
          },
          {
            label: (
              <Badge size="small" count={unreadVendorChatrooms}>
                <div style={{ paddingRight: "8px" }}>Vendors</div>
              </Badge>
            ),
            key: "VENDOR",
            children: (
              <VendorChat
                chatRooms={vendorChatRooms}
                user={{
                  ...authuser,
                  name: profile?.user_info?.display_name,
                }}
                parentHeight={parentHeight}
              />
            ),
          },
        ]}
        onChange={() => {
          refresh();
        }}
      />
    </div>
  );
};

export default ChatHome;
