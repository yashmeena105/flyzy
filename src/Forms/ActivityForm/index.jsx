import Input from "Components/Input";
import "Styles/Global.scss";
import React, { useState } from "react";
import "../styles.scss";
import { paddingSmall } from "Styles/Global.jsx";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FixedWidthButton } from "Components/Buttons";
import Rating from "Components/FormComponents/Rating/Rating";
import paths from "services/apiConstants";
import DropDownGodAsync from "Components/DropDownGodAsyncAutocomplete";
import { useRef } from "react";
import ImageTile from "Components/ImageTile";
import AddImageButton from "Components/AddImageButton";
import SelectMediaPopup from "Components/SelectMediaPopup";
const ActivityForm = ({ data }) => {
  const [stepper, setSetpper] = useState(false);
  const [mediaPopupVisible, setMediaPopupVisible] = useState(false);
  const [selectedDate, handleDateChange] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [hotelImages, setImages] = useState([]);
  const inputRef = useRef(null);

  const initialValues = {
    id: null,
    type: "EXCURSION",
    is_active: false,
  };

  const handleAddImage = (e) => {
    hotelImages.push([...hotelImages, e.target.files[0]]);
  };
  const handleChangeProfilePic = () => {
    inputRef.current.click();
  };

  const validationSchema = Yup.object({});

  const isEditingOrCreating = (values) => {};

  const onSubmit = async (values) => {
    const data = {
      destination: destinations[0],
      activity_name: values?.activity_name,
      type: values?.type,
      description: values?.description,
      address: values?.address,
      address_map_link: values?.address_map_link,
      inclusions_id: values?.inclusions_id,
      tnc_id: values?.tnc_id,
      external_ratings: values?.external_ratings,
    };
    console.log("data", data);
    // TODO: If id doesn't exist in activity, CREATE NEW. Else, UPDATE activity details
    // let res = await AxiosAll("POST", paths.addStay, data, authuser.uid);
    // if (res?.status == 200) {
    //   setFormOpen(false);
    //   formik?.handleReset();
    // }
  };

  const showInsertMediaPopup = () => {
    return;
  };

  const formik = useFormik({
    initialValues: data ?? initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <>
      {mediaPopupVisible ? (
        <SelectMediaPopup
          open={mediaPopupVisible}
          setOpen={setMediaPopupVisible}
        />
      ) : (
        <></>
      )}
      <div className="form-container">
        <h2>
          {formik.values?.activity_name ?? "Add New Activity"}{" "}
          {data?.id ? `(#${data.id})` : ""}
        </h2>
        <div className="tb">
          <div className="left">
            <div>
              <label>Category</label>
            </div>
            <FormControl id="activityType">
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="type"
                value={formik?.values?.type}
                onChange={formik.handleChange}
                row
              >
                <FormControlLabel
                  value="SIGHTSEEING"
                  control={<Radio size="small" />}
                  label="Sightseeing"
                />
                <FormControlLabel
                  value="TREKKING/HIKING"
                  control={<Radio size="small" />}
                  label="Trekking/Hiking"
                />
                <FormControlLabel
                  value="ADVENTURE"
                  control={<Radio size="small" />}
                  label="Adventure"
                />
                <FormControlLabel
                  value="EXCURSION"
                  control={<Radio size="small" />}
                  label="Excursion"
                />
                <FormControlLabel
                  value="EVENT"
                  control={<Radio size="small" />}
                  label="Event"
                />
              </RadioGroup>
            </FormControl>
            <Input
              label="Activity Name"
              required={true}
              name="activity_name"
              placeholder="Enter name"
              marginBottom={paddingSmall}
              value={formik?.values?.activity_name}
              onChange={formik.handleChange}
            />
            <Box sx={{ m: "4px" }} />
            <Input
              name="description"
              label="Short Description"
              placeholder="Activity Description"
              type="textarea"
              marginBottom={paddingSmall}
              value={formik?.values?.description}
              onChange={formik?.handleChange}
              // onBlur={formik?.handleBlur}
            />
            <Box sx={{ m: "4px" }} />
            <DropDownGodAsync
              labelName="Location"
              multi={true}
              onChange={(val) => {
                setDestinations(val);
              }}
              // TODO: Replace with initialValue from redux
              initialValue={destinations}
              searchUrl={paths.getDestinations}
              labelField="formatted_address"
            />

            <Box sx={{ m: "16px" }} />
            <FixedWidthButton
              name={formik?.values?.id ? "Save" : "ADD ACTIVITY"}
              type="submit"
              theme="primary"
            />
          </div>
          <div className="right">
            <label htmlFor="images">Activity Images</label>
            <Box sx={{ m: "4px" }} />
            <div className="imagesWrapper">
              {formik?.values?.images?.map((image) => {
                return <ImageTile image={image} />;
              })}
              <div
                onClick={() => {
                  console.log("pressed");
                  setMediaPopupVisible(true);
                }}
              >
                <AddImageButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityForm;
