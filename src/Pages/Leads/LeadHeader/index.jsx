import "./styles.scss";

const LeadHeader = () => {
  return (
    <div className="lead-header">
      <div className="flex-1">ID</div>
      <div className="flex-1">Status</div>
      <div className="flex-2">Name</div>
      <div className="flex-1">Requirement</div>
      <div className="flex-3">
        <div className="col">
          <div className="dates">Travel Dates</div>
          <div className="pax">Pax Count</div>
        </div>
      </div>
      <div className="flex-1">Assignee</div>
      <div className="flex-0">On App?</div>
      <div className="flex-2">{`Destination(s)`}</div>
    </div>
  );
};

export default LeadHeader;
