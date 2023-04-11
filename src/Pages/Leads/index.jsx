import { Button, Drawer, Layout, Row, Col } from "antd";
import AddLeadForm from "Forms/AddLeadForm";
import LeadDrawerForm from "Forms/LeadDrawerForm";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CompanyMember } from "redux/actions/CompanyAction";
import paths from "services/apiConstants";
import { AxiosAll } from "services/NetworkEngine";
import ActionBar from "../../Components/ActionBar";
import TopBar from "../../Components/TopBar";
import StayRow from "../Master/StayRow";
import LeadHeader from "./LeadHeader";
import LeadRow from "./LeadRows";

import "./styles.scss";
function Leads() {
  const [searchText, setSearchText] = useState("");
  const [leadList, setLeadList] = useState();
  const [userList, setUserList] = useState();
  const { authuser } = useSelector((state) => state.auth);
  //To open and closing of form
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch();

  // make wrapper functions to pass to child
  const wrapperSetSearchState = useCallback((val) => {
    console.log("val", val);
    setSearchText(val);
  }, []);

  const getLeads = async () => {
    let leadsList = await AxiosAll("GET", paths.getLeads, {}, authuser.uid);
    setLeadList(leadsList);
    console.log("leads list", leadsList?.data);
  };

  const getCompanyUser = async () => {
    let leadsList = await AxiosAll(
      "POST",
      paths.getCompanyUser,
      {},
      authuser.uid
    );
    setUserList(leadsList);
    dispatch(CompanyMember(leadsList));
    console.log("leads list", leadsList?.data);
  };

  useEffect(() => {
    getLeads();
  }, [formOpen]);

  useEffect(() => {
    getCompanyUser();
  }, []);

  return (
    <div className="leads-container">
      <TopBar title="All Leads" />
      <LeadDrawerForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
        }}
      />
      <Row gutter={[12, 6]} style={{ width: "100%" }}>
        <Col flex={"auto"}></Col>
        <Col>
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              setFormOpen(true);
            }}
          >
            Add New Trip
          </Button>
        </Col>
      </Row>
      {/* <ActionBar
        actionLabel="Add Lead"
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        parentSearchSetter={wrapperSetSearchState}
        formContent={
          <AddLeadForm
            closeForm={() => {
              setFormOpen(false);
            }}
          />
        }
      /> */}
      <div className="lead-rows-container">
        <LeadRow leadList={leadList} />
      </div>
    </div>
  );
}

export default Leads;
