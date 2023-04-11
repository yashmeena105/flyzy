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
import SimpleSelect from "Components/SimpleSelect";
import ImagePreview from "Components/ImagePreview";
const ItineraryForm = ({ data }) => {
  const [stepper, setSetpper] = useState(false);
  const [mediaPopupVisible, setMediaPopupVisible] = useState(false);
  const [selectedDate, handleDateChange] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [hotelImages, setImages] = useState([]);
  const inputRef = useRef(null);

  const initialValues = {
    id: null,
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
      id: values?.id,
      itinerary_name: values?.itinerary_name,
      destinations: destinations,
      type: values?.type,
      description: values?.description,
      theme_id: values?.theme_id,
      theme_object: values?.theme_object,
    };
    console.log("data", data);
    // TODO: If id doesn't exist in itinerary, CREATE NEW. Else, UPDATE itinerary details
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
          {formik.values?.itinerary_name ?? "Add New Itinerary"}{" "}
          {data?.id ? `(#${data.id})` : ""}
        </h2>
        <div className="tb">
          <div className="left">
            <Input
              label="Itinerary Name"
              required={true}
              name="itinerary_name"
              placeholder="Enter name"
              marginBottom={paddingSmall}
              value={formik?.values?.itinerary_name}
              onChange={formik.handleChange}
            />
            <Box sx={{ m: "4px" }} />
            <Input
              name="description"
              label="Short Description"
              placeholder="Itinerary Description"
              type="textarea"
              marginBottom={paddingSmall}
              value={formik?.values?.description}
              onChange={formik?.handleChange}
              // onBlur={formik?.handleBlur}
            />
            <Box sx={{ m: "4px" }} />
            <DropDownGodAsync
              labelName="Destinations Covered"
              multi={true}
              onChange={(val) => {
                setDestinations(val);
              }}
              // TODO: Replace with initialValue from redux
              initialValue={destinations}
              searchUrl={paths.getDestinations}
              labelField="formatted_address"
            />
            <Box sx={{ m: "4px" }} />
            <Input
              label="No. of Days"
              name="number_of_days"
              placeholder="e.g. 7"
              marginBottom={paddingSmall}
              value={formik?.values?.number_of_days}
              onChange={formik.handleChange}
              disabled={formik.values?.id ? true : false}
            />
            <Box sx={{ m: "4px" }} />
            <SimpleSelect
              options={[{ value: "Dubai", label: "Dubai Theme" }]}
            />
            <Box sx={{ m: "8px" }} />
            {formik?.values?.theme_object?.images[0] ? (
              <ImagePreview
                image={{
                  url: formik?.values?.theme_object?.images[0],
                }}
              />
            ) : (
              <></>
            )}
            <Box sx={{ m: "16px" }} />
            <FixedWidthButton
              name={formik?.values?.id ? "Save" : "ADD ACTIVITY"}
              type="submit"
              theme="primary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItineraryForm;
