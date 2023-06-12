import React from "react";
import { Link } from "react-router-dom";
import "./LateralNav.scss";
import LateralNavElem from "../LateralNavElem/LateralNavElem";

export default function LateralNav({ arrOfElem }) {
  return (
    <div className="lateralBar">
      <div className="lateralBar__nav">
        {arrOfElem.map((elem, index) => {
          return (
            <Link to="#" key={index}>
              <LateralNavElem elem={elem} />
            </Link>
          );
        })}
      </div>
      <p className="lateralBar__copyright">Copyright, SportSee 2020</p>
    </div>
  );
}
