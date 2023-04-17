import React from "react";
import NavBar from "./NavBar";

export default function PageFormat({ value }) {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ height: "5%", width: "100%" }}>
        <NavBar />
      </div>
      <div
        style={{
          height: "95%",
          width: "100%",
          // paddingTop: 5,
          backgroundColor: "#F3F3F2",
        }}
      >
        {value}
      </div>
    </div>
  );
}
