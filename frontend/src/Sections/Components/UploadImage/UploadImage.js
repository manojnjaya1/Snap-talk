import React, { useState } from "react";
import "./index.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

export default function UploadImage({pic,setpic,loading,setloading}) {
  const postDetails = (pics) => {
    setloading(true);
    if (!pics) {
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "djykpxtae");
      fetch("https://api.cloudinary.com/v1_1/djykpxtae/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        });
    } else {
    }
  };
  return (
    <>
      <div className="upload-docs squircles">
        {!pic && (
          <label htmlFor="pic" className="upload-docs-lb ">
            {/* squircles */}
            <CameraAltRoundedIcon />
            ADD GROUP <br /> ICON
            <input
              type="file"
              className="upload-docs-input"
              id="pic"
              name="pic"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </label>
        )}
        {pic && <img src={pic} alt="" />}
      </div>
    </>
  );
}
