import React from "react";
import "./NutriPoint.scss";

export default function NutriPoint({ name, value, image, alt, unit }) {
  return (
    <div className={`nutriPoint ${name}`}>
      <div className="nutriPoint__Container">
        <div className="logo">
          <img src={image} alt={alt} />
        </div>
        <div className="statContainer">
          <p className="stat__value">
            {value}
            {unit}
          </p>
          <p className="stat__name">{name}</p>
        </div>
      </div>
    </div>
  );
}
