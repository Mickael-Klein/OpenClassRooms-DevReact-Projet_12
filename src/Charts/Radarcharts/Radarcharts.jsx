import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Radarcharts.scss";

export default function Radarcharts({ data }) {
  // eslint-disable-next-line
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    if (data) {
      const tempMaxValue = Math.max(...data.map((obj) => obj.value));
      setMaxValue(tempMaxValue + tempMaxValue * 0.1);
    }
  }, [data]);

  return (
    <>
      {data && (
        <div className="radarChart squareChart">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={data}>
              <PolarGrid
                gridType="polygon"
                radialLines={false}
                polarRadius={[15, 28, 45, 65, 85]}
                stroke="#FFFFFF"
              />
              <PolarAngleAxis
                dataKey="subject"
                tickLine={false}
                tick={<CustomTick />}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[minValue, maxValue]}
                tick={false}
                stroke="var(--body-bg-color)"
              />
              <Radar dataKey="value" fill="#FF0101B2" fillOpacity={0.7} />
              <Tooltip
                animationEasing="ease-out"
                content={<RadarCustomTooltip payload={data} />}
                offset={55}
                wrapperStyle={{ outline: "none" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}

function RadarCustomTooltip(active) {
  let subjectData = null;
  let valueData = null;

  for (let payloadValue of active.payload) {
    subjectData = payloadValue.payload.subject;
    valueData = payloadValue.payload.value;
  }
  return (
    <div className="tool-tip__radar-chart">
      <p className="tool-tip__radar-chart-text">{`${subjectData}`}</p>
      <p className="tool-tip__radar-chart-text">{`${valueData}`}</p>
    </div>
  );
}

function CustomTick({ payload, x, y, textAnchor, stroke, radius }) {
  return (
    <g className="recharts-layer recharts-polar-angle-axis-tick">
      <text
        radius={radius}
        stroke={stroke}
        x={x}
        y={y}
        className="recharts-text recharts-polar-angle-axis-tick-value"
        textAnchor={textAnchor}
      >
        {placeCustomTickLabel(payload, x, "#ffffff")}
      </text>
    </g>
  );
}

/**
 * Modify the position of the labels thanks to the dx and dy property that
 * each svg element can have. 90° is the top level label, and by default
 * it's a bit to close to the painted Axis, so we displace it by -5 on the Y axis
 * with dy=-5 et voilà ! Same logic for each label, for example, the bottom one
 * is -90°, and it's also too close by default, so we translate it further
 * down the Y axis with dy=15, etc...
 */
function placeCustomTickLabel(payload, x, fill) {
  const { coordinate, value } = payload;
  switch (coordinate) {
    case 90:
      return <CustomTickLabel x={x} dx={0} dy={-5} fill={fill} value={value} />;
    case 30:
      return <CustomTickLabel x={x} dx={-7} dy={5} fill={fill} value={value} />;
    case -30:
      return <CustomTickLabel x={x} dx={0} dy={5} fill={fill} value={value} />;
    case -90:
      return <CustomTickLabel x={x} dx={0} dy={15} fill={fill} value={value} />;
    case -120:
      return <CustomTickLabel x={x} dx={0} dy={5} fill={fill} value={value} />;
    case -150:
      return <CustomTickLabel x={x} dx={5} dy={5} fill={fill} value={value} />;
    case -210:
      return <CustomTickLabel x={x} dx={0} dy={5} fill={fill} value={value} />;
    default:
      console.log("Invalid Coordinate in RadarChart");
      break;
  }
}

/**
 * CustomTickLabel.
 * Separated tspan for increasing readability.
 */
function CustomTickLabel({ value, x, dx, dy, fill }) {
  return (
    <tspan x={x} dx={dx} dy={dy} fill={fill}>
      {value}
    </tspan>
  );
}
