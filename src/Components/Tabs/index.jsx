import "./styles.scss";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
const Tabs = ({
  options,
  variant = "fullWidth",
  initialValue,
  shadow = true,
  linkTabs = false,
}) => {
  const [value, setValue] = React.useState(initialValue ?? options[0].index);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  return (
    <Box className="tabs-container" sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          className={`tabs-box ${shadow ? "shadow" : ""}`}
          sx={{ borderBottom: 0, textColor: "#1677ff" }}
        >
          <TabList
            className="tabs-list"
            onChange={handleChange}
            variant={variant}
            aria-label="secondary tabs example"
          >
            {options.map((o) => {
              if (linkTabs)
                return (
                  <LinkTab
                    className="tab"
                    label={o.label}
                    value={o.index}
                    href={`/${o.label.toLowerCase()}`}
                  />
                );
              return <Tab className="tab" label={o.label} value={o.index} />;
            })}
          </TabList>
        </Box>
        {options.map((o) => {
          return (
            <TabPanel className="tab-panel" value={o.index}>
              {o.target}
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
};

export default Tabs;
