import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import "./RadialBarcharts.scss";

export default function RadialBarcharts({ data }) {
  const startAngleDegrees = 90;
  return (
    <>
      {data.length > 0 && (
        <div className="radialBarChart squareChart">
          <div className="radialBarChartCustomLegend">Score</div>
          <div className="radialBarCustomLabel">
            <h3>{data[0].score}%</h3>
            <div className="objectif">
              <p>
                de votre <br />
                objectif
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="85%"
              data={data}
              startAngle={startAngleDegrees}
              endAngle={startAngleDegrees + (data[0].score * 360) / 100}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <RadialBar
                minAngle={15}
                label={false}
                background
                clockWise
                dataKey="score"
                fill="#ff0101"
                cornerRadius={100}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
