import "./styles.scss";
import React from "react";
import SimpleColoredTag from "Components/SimpleColoredTag";
import AppUsageIcon from "Components/AppUsageIcon";
import PaxCount from "Components/PaxCount";
import DateTag from "Components/DateTag";
import SimpleSelect from "Components/SimpleSelect";
import DestinationTag from "Components/DestinationTag";
const LeadRow2 = () => {
  const options = [
    { value: "rahul@flyzygo.com", label: "Rahul Nagarwal" },
    { value: "anil@flyzygo.com", label: "Anil Dhakad" },
    { value: "hansraj@flyzygo.com", label: "Hansraj Patel" },
  ];
  return (
    <div className="lead-row">
      <div className="flex-1 id">KF2209007</div>
      <div className="flex-1 col">
        <SimpleColoredTag text="New Lead" color="lightBlue" />
        <SimpleColoredTag text="High Priority" color="lightRed" />
      </div>
      <div className="flex-2">Ramesh Sharma</div>
      <div className="flex-1 wrap">
        <SimpleColoredTag text="Full Package" color="gold" />
      </div>
      <div className="flex-3">
        <div className="col">
          <div className="dates">
            <DateTag text="27 Dec 22 - 12 Jan 23" />
          </div>
          <div className="pax">
            <PaxCount adults={300} children={0} infants={0}/>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <SimpleSelect options={options}/>
      </div>
      <div className="flex-0 phone">
        <AppUsageIcon active={false} />
      </div>
      <div className="flex-2 col">
        <DestinationTag text={"Dubai, Dubai, United Arab Emirates"} />
        <DestinationTag text={"Abu Dhabi, United Arab Emirates"} />
      </div>
    </div>
  );
};

export default LeadRow2;
