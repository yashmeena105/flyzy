import { Box } from "@mui/system";
import AddressInput from "Forms/AddressInput";
import { FixedWidthButton } from "Components/Buttons";
import Input from "Components/Input";
import { useEffect, useState } from "react";
import { paddingSmall } from "Styles/Global.jsx";
import "Styles/Global.scss";
import { useFormik } from "formik";
import "../styles.scss";
import icons from "Assets/Icons";
import ImageAttachment from "Components/ImageAttachment/ImageAttachment";
import { AxiosAll } from "services/NetworkEngine";
import paths from "services/apiConstants";
import { useSelector } from "react-redux";
import Uploader from "Components/Uploader";
import { useRef } from "react";

const CompanySettingsForm = ({ companyProfileDetail, getCompanyDetail }) => {
  const [companyBusinessDirty, setCompanyBusinessDirty] = useState(false);
  const [companyBillingDirty, setCompanyBillingDirty] = useState(false);
  const [companyContactDirty, setCompanyContactDirty] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(null);
  const { authuser } = useSelector((state) => state.auth);

  const initialValues = {
    brand_name: "",
    name: "",
    email: "",
    phone_number: "",
    id: "",
    business_name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    pan_number: "",
    tan_number: "",
    gstin_number: "",
  };

  // const validationSchema = Yup.object({
  //   name: "",
  //   email:"",
  //   phone_number: "",
  // });

  const onSubmit = async (values) => {
    try {
      const data = {
        brand_name: values?.brand_name,
        name: values?.name,
        email: values?.email,
        phone_number: values?.phone_number,
        id: companyProfileDetail?._id,
        business_name: values?.business_name,
        line1: values?.line1,
        line2: values?.line2,
        city: values?.city,
        state: values?.state,
        zipcode: values?.zipcode,
        country: values?.country,
        gstin_number: values?.gstin_number,
      };

      let profile = await AxiosAll(
        "POST",
        paths?.updateCompanyDetail,
        data,
        authuser.uid
      );
      console.log("customers list", profile);
      setCompanyBillingDirty(false);
      setCompanyBusinessDirty(false);
      setCompanyContactDirty(false);
      // setProfile(profile?.data?.user_info)
    } catch (error) {
      alert(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  useEffect(() => {
    // setGetCompanyLogo(companyProfileDetail?.logo);
    formik.setFieldValue("brand_name", companyProfileDetail?.brand_name);
    formik.setFieldValue("business_name", companyProfileDetail?.business_name);
    formik.setFieldValue("line1", companyProfileDetail?.address?.line1);
    formik.setFieldValue("line2", companyProfileDetail?.address?.line2);
    formik.setFieldValue("city", companyProfileDetail?.address?.city);
    formik.setFieldValue("state", companyProfileDetail?.address?.state);
    formik.setFieldValue("zipcode", companyProfileDetail?.address?.zipcode);
    formik.setFieldValue("country", companyProfileDetail?.address?.country);
    formik.setFieldValue(
      "gstin_number",
      companyProfileDetail?.tax_info?.gstin_number
    );
    formik.setFieldValue(
      "phone_number",
      companyProfileDetail?.primary_contact?.phone_number
    );
    formik.setFieldValue("email", companyProfileDetail?.primary_contact?.email);
    formik.setFieldValue("name", companyProfileDetail?.primary_contact?.name);
  }, [companyProfileDetail]);

  useEffect(() => {
    if (
      companyProfileDetail?.primary_contact?.name === formik?.values?.name &&
      companyProfileDetail?.primary_contact?.email === formik?.values?.email &&
      companyProfileDetail?.primary_contact?.phone_number ===
        formik?.values?.phone_number
    ) {
      setCompanyContactDirty(false);
    } else {
      setCompanyContactDirty(true);
    }
  }, [formik?.values]);

  useEffect(() => {
    if (
      companyProfileDetail?.tax_info?.gstin_number ===
      formik?.values?.gstin_number
    ) {
      setCompanyBillingDirty(false);
    } else {
      setCompanyBillingDirty(true);
    }
  }, [formik?.values]);

  useEffect(() => {
    if (
      companyProfileDetail?.address?.city === formik?.values?.city &&
      companyProfileDetail?.address?.state === formik?.values?.state &&
      companyProfileDetail?.address?.zipcode === formik?.values?.zipcode &&
      companyProfileDetail?.address?.country === formik?.values?.country &&
      companyProfileDetail?.address?.line1 === formik?.values?.line1 &&
      companyProfileDetail?.address?.line2 === formik?.values?.line2 &&
      companyProfileDetail?.brand_name === formik?.values?.brand_name &&
      companyProfileDetail?.business_name === formik?.values?.business_name
    ) {
      setCompanyBusinessDirty(false);
    } else {
      setCompanyBusinessDirty(true);
    }
  }, [formik?.values]);

  const closeContactbtn = () => {
    setCompanyContactDirty(false);
  };

  const closeAddresbtn = () => {
    setCompanyBusinessDirty(false);
  };

  const closeBillingbtn = () => {
    setCompanyBillingDirty(false);
  };

  const handleUploadImage = async (files) => {
    const f = companyLogo;
    console.log("File", companyLogo?.name);

    const response = await AxiosAll(
      "POST",
      paths.updateCompanyDetail,
      {
        logo: {
          name: companyLogo?.name,
          mimetype: companyLogo?.type,
        },
      },
      authuser.uid
    );
    console.log("response", response);

    const uploadUrl = response.data.uploadUrlList[0].company_logo;
    UploadAWS(uploadUrl);
  };

  const UploadAWS = (url) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", `${companyLogo?.type}`);

    // var file = new Blob(photoUrl) ;

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: companyLogo,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result", result);
        getCompanyDetail();
      })
      .catch((error) => {
        console.log("error", error);
        getCompanyDetail();
      });
  };

  const handleChangeProfilePic = () => {
    inputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    setCompanyLogo(event.target.files[0]);

    //  const data= Buffer.from(event.target.files[0],"utf-8")
    //  console.log("fileObj",data)
  };
  const inputRef = useRef(null);

  // TODO: Fires when page reloads, Fix it.
  // useEffect(() => {
  //   handleUploadImage();
  // }, [companyLogo]);

  return (
    <div className="form-container">
      {/* Business Details Start */}
      <div className="myavatar">
        <img
          className="userIcon"
          src={
            companyLogo
              ? URL.createObjectURL(companyLogo)
              : companyProfileDetail?.logo?.logo_url
          }
        ></img>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        <div
          onClick={() => {
            handleChangeProfilePic();
          }}
          className="changeButton"
        >
          Change
        </div>
      </div>

      {/* <ImageAttachment
        source={{ name: companyLogo?.logo_name, url: companyLogo?.logo_url }}
      /> */}
      <Box sx={{ m: "4px" }} />
      <form onSubmit={formik?.handleSubmit}>
        <h2>Business Details</h2>
        <Input
          label="Brand Name"
          name="brand_name"
          placeholder="Your brand/company name"
          marginBottom={paddingSmall}
          value={formik.values?.brand_name}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
        />
        <Input
          label="Legal Name"
          name="business_name"
          placeholder="Company registered name"
          marginBottom={paddingSmall}
          value={formik.values?.business_name}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
        />
        <Box sx={{ m: "4px" }} />
        <Input
          label="Address Line 1"
          placeholder="Address Line 1"
          name="line1"
          marginBottom={paddingSmall}
          value={formik.values?.line1}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
        />
        {/* <MaterialInput/> */}
        <Input
          label="Address Line 2"
          placeholder="Address Line 2"
          name="line2"
          marginBottom={paddingSmall}
          value={formik.values?.line2}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
        />
        <div className="inputRow">
          <div className="flexBox">
            <Input
              label="City"
              placeholder="City"
              name="city"
              marginBottom={paddingSmall}
              value={formik.values?.city}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            />
          </div>
          <Box sx={{ m: "4px" }} />
          <div className="flexBox">
            <Input
              label="State"
              placeholder="State"
              name="state"
              marginBottom={paddingSmall}
              value={formik.values?.state}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            />
          </div>
        </div>
        <div className="inputRow">
          <div className="flexBox">
            <Input
              label="Pin/zip Code"
              name="zipcode"
              placeholder="e.g. 110022"
              marginBottom={paddingSmall}
              value={formik.values?.zipcode}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            />
          </div>
          <Box sx={{ m: "4px" }} />
          <div className="flexBox">
            <Input
              label="Country"
              name="country"
              placeholder="Country"
              marginBottom={paddingSmall}
              value={formik.values?.country}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            />
          </div>
        </div>
        {companyBusinessDirty && (
          <>
            <Box sx={{ m: "8px" }} />
            <div className="inputRow">
              <div className="flexBox">
                <FixedWidthButton name="Save" theme="primary" type={"submit"} />
              </div>
              <Box sx={{ m: "4px" }} />
              <div className="flexBox">
                <FixedWidthButton
                  name="CANCEL"
                  theme="red"
                  type={"button"}
                  onClick={closeAddresbtn}
                />
              </div>
            </div>
          </>
        )}

        {/* Business Details End */}

        {/* Tax and Billing Details Start */}

        <Box sx={{ m: "18px" }} />
        <h2>Tax and Billing Details</h2>
        <Input
          label="GSTIN"
          name="gstin_number"
          placeholder="e.g. 29GGGGG1314R9Z6"
          marginBottom={paddingSmall}
          value={formik.values?.gstin_number}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
        />
        {companyBillingDirty && (
          <>
            <Box sx={{ m: "8px" }} />
            <div className="inputRow">
              <div className="flexBox">
                <FixedWidthButton name="Save" theme="primary" type={"submit"} />
              </div>
              <Box sx={{ m: "4px" }} />
              <div className="flexBox">
                <FixedWidthButton
                  name="CANCEL"
                  theme="red"
                  type={"button"}
                  onClick={closeBillingbtn}
                />
              </div>
            </div>
          </>
        )}
        <Box sx={{ m: "18px" }} />

        {/* Tax and Billing Details End */}

        <h2>Primary Contact Details</h2>
        <Input
          label="Name"
          placeholder="Full Name"
          marginBottom={paddingSmall}
          name="name"
          value={formik?.values?.name}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
        />
        <Input
          label="Email Address"
          placeholder="e.g. user@gmail.com"
          name="email"
          marginBottom={paddingSmall}
          value={formik?.values?.email}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
        />
        <Input
          label="Mobile Number"
          placeholder="e.g. +91XXXXXXXXXX"
          name="phone_number"
          marginBottom={paddingSmall}
          value={formik?.values?.phone_number}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
        />

        {companyContactDirty && (
          <>
            <Box sx={{ m: "8px" }} />
            <div className="inputRow">
              <div className="flexBox">
                <FixedWidthButton name="Save" theme="primary" type={"submit"} />
              </div>
              <Box sx={{ m: "4px" }} />
              <div className="flexBox">
                <FixedWidthButton
                  name="CANCEL"
                  theme="red"
                  onClick={closeContactbtn}
                />
              </div>
            </div>
          </>
        )}
        <Box sx={{ m: "36px" }} />
      </form>
    </div>
  );
};

export default CompanySettingsForm;
