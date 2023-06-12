import React from "react";
import "./LateralNavElem.scss";

export default function LateralNavElem({ elem }) {
  return (
    <div className="lateralNavElem">
      <img src={elem} alt="logo navigation" />
    </div>
  );
}
