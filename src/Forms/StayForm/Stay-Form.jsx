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
import { AxiosAll } from "services/NetworkEngine";
import { useSelector } from "react-redux";
const StayForm = ({ data }) => {
  const { authuser } = useSelector((state) => state.auth);
  const [stepper, setSetpper] = useState(false);
  const [mediaPopupVisible, setMediaPopupVisible] = useState(false);
  const [stars, setStar] = useState(data?.stars || null);
  const [destinations, setDestinations] = useState([]);
  const [hotelImages, setImages] = useState(data?.images || []);
  const inputRef = useRef(null);

  const initialValues = {
    master_component_name: "",
    description: "",
    type: "",
  };

  const validationSchema = Yup.object({});

  const onSubmit = async (values) => {
    if (data?.id) {
      const payload = {
        id: data?.id,
        destination: destinations[0] ? destinations[0] : data?.destination,
        master_component_name: values?.master_component_name,
        description: values?.description,
        stars: stars,
        images: hotelImages ? hotelImages : data?.images,
        type: values?.type,
      };
      console.log("data", data);
      // TODO: If id doesn't exist in stay, CREATE NEW. Else, UPDATE stay details
      let res = await AxiosAll(
        "POST",
        paths.updateMasterStay,
        payload,
        authuser.uid
      );
      console.log("res", res);

      if (res?.status == 200) {
        console.log("res1", res);
        formik?.handleReset();
      }
    } else {
      const payload = {
        destination: destinations[0],
        master_component_name: values?.master_component_name,
        description: values?.description,
        stars: stars,
        images: [{}],
        type: values?.type,
      };
      console.log("data", data);
      // TODO: If id doesn't exist in stay, CREATE NEW. Else, UPDATE stay details
      let res = await AxiosAll("POST", paths.addStay, payload, authuser.uid);
      console.log("res", res);

      if (res?.status == 200) {
        console.log("res1", res);
        formik?.handleReset();
      }
    }
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
          setImages={setImages}
        />
      ) : (
        <></>
      )}
      <div className="form-container">
        <h2>
          {formik.values?.master_component_name ?? "Add New Stay"}{" "}
          {data?.id ? `(#${data.id})` : ""}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="tb">
            <div className="left">
              <div>
                <label>Category</label>
              </div>
              <FormControl id="stayType">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="type"
                  value={formik?.values?.type}
                  onChange={formik.handleChange}
                  row
                >
                  <FormControlLabel
                    value="HOTEL"
                    control={<Radio size="small" />}
                    label="Hotel"
                  />
                  <FormControlLabel
                    value="VILLA"
                    control={<Radio size="small" />}
                    label="Villa"
                  />
                  <FormControlLabel
                    value="CAMPING"
                    control={<Radio size="small" />}
                    label="Camping"
                  />
                  <FormControlLabel
                    value="HOSTEL"
                    control={<Radio size="small" />}
                    label="Hostel"
                  />
                </RadioGroup>
              </FormControl>
              <Input
                label="Place Name"
                required={true}
                name="master_component_name"
                placeholder="Enter name"
                marginBottom={paddingSmall}
                value={formik?.values?.master_component_name}
                onChange={formik.handleChange}
              />
              <Box sx={{ m: "4px" }} />
              <Input
                name="description"
                label="Short Description"
                placeholder="Stay Description"
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
                initialValue={destinations?.formatted_address}
                searchUrl={paths.getDestinations}
                labelField="formatted_address"
              />
              <Box sx={{ m: "8px" }} />
              <label htmlFor="rating">Star Rating</label>
              <Box sx={{ m: "4px" }} />
              <Rating setStar={setStar} star={stars} />

              <Box sx={{ m: "16px" }} />
              <FixedWidthButton
                name={formik?.values?.id ? "Save" : "ADD STAY"}
                type="submit"
                theme="primary"
              />
            </div>
            <div className="right">
              <label htmlFor="images">Stay Images</label>
              <Box sx={{ m: "4px" }} />
              <div className="imagesWrapper">
                {hotelImages?.map((image) => {
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
        </form>
      </div>
    </>
  );
};

export default StayForm;
