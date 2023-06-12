import React from "react";
import "./Logo.scss";
import LogoPicture from "../LogoPicture/LogoPicture";

export default function Logo() {
  return (
    <div className="logo">
      <div className="logoPicture">
        <LogoPicture />
      </div>
      <div className="logoName">SportSee</div>
    </div>
  );
}
