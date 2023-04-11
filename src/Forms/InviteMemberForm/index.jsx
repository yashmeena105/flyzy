import { Box } from "@mui/system";
import { Drawer } from "antd";
import { FixedWidthButton } from "Components/Buttons";
import Input from "Components/Input";
import SimpleSelect from "Components/SimpleSelect";
import { paddingSmall } from "Styles/Global.jsx";
import "Styles/Global.scss";
import "../styles.scss";
import { options } from "./options";
const InviteMemberForm = ({ open, setOpen }) => {
  return (
    <Drawer
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="form-container">
        <div className="tb">
          <div className="left">
            <h2>Invite New Member</h2>
            <Box sx={{ m: "4px" }} />
            <Input
              label="Email"
              placeholder="e.g. user@gmail.com"
              marginBottom={paddingSmall}
            />
            <SimpleSelect options={options} />
            <Box sx={{ m: "16px" }} />
            <div className="inputRow">
              <div className="flexBox">
                <FixedWidthButton name="Submit" theme="primary" />
              </div>
              <Box sx={{ m: "4px" }} />
              <div className="flexBox">
                <FixedWidthButton name="CANCEL" theme="red" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default InviteMemberForm;
