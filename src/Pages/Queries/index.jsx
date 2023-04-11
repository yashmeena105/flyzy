import { message, Row } from "antd";
import VendorChat from "Pages/LeadDetails/Chats/VendorChat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeadService from "services/LeadService";

const Queries = () => {
  const { authuser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(true);
  const [vendorChatRooms, setVendorChatRooms] = useState([]);
  const [customerRoom, setCustomerRoom] = useState(null);
  const [unreadVendorChatrooms, setUnreadVendorChatrooms] = useState(0);
  const [unreadCustomerMessages, setUnreadCustomerMessages] = useState(0);

  const refresh = async () => {
    setLoading(true);
    let resp = await LeadService.getQueryChatRooms();
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
    refresh();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <VendorChat
        user={{
          ...authuser,
          name: profile?.user_info?.display_name,
        }}
        chatRooms={vendorChatRooms}
        parentHeight="100vh"
        location="QUERIES"
      />
    </div>
  );
};

export default Queries;
