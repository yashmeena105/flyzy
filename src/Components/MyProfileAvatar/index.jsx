import React, { useRef, useState } from "react";
import { Buffer } from "buffer";

import "./styles.scss";
import icons from "Assets/Icons";
import { async } from "@firebase/util";
const MyProfileAvatar = ({
  url,
  setPhotoUrl,
  photoUrl,
  setIsFormDirty,
  setBase64,
  onSubmit,
}) => {
  const inputRef = useRef(null);

  const handleChangeProfilePic = () => {
    inputRef.current.click();
    setIsFormDirty(true);
  };
  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    setPhotoUrl(event.target.files[0]);
    //  const data= Buffer.from(event.target.files[0],"utf-8")
    //  console.log("fileObj",data)

    var FR = new FileReader();

    FR.onload = function () {
      setBase64(FR.result);
      console.log("FR", FR);
    };

    const image_bytes = Buffer.from(event.target.files[0], "base64");
    console.log("image_bytes",image_bytes);

    FR.readAsBinaryString(event.target.files[0]);
    if (event.target.files[0]) {
      onSubmit();
    }
    
    // const base64 = await convertBase64(fileObj);
    // console.log(base64);
    // setBase64(base64);
  };

  // const convertBase64 = (file) => {
  //   return new Promise((res, rej) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       res(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       rej(error);
  //     };
  //   });
  // };
  return (
    <div className="myavatar">
      <img
        className="userIcon"
        src={photoUrl ? URL.createObjectURL(photoUrl) : url}
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
  );
};
export default MyProfileAvatar;
