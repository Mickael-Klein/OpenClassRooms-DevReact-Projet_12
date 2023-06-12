import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import "./Linecharts.scss";

export default function Linecharts({ data }) {
  return (
    <div className="lineChart squareChart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: -80,
            bottom: 25,
          }}
        >
          <XAxis
            dataKey="dayTick"
            tickLine={false}
            axisLine={false}
            interval={0}
            dy={15}
            padding={{ right: -10, left: 12 }}
            tick={{ fill: "#FFFFFF", opacity: "0.5" }}
          />
          <YAxis
            dataKey="sessionLength"
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 10", "dataMax + 10"]}
            type="number"
          />
          <Tooltip
            content={renderTooltip}
            cursor={<CustomCursor width={500} height={500} />}
          />

          <Legend content={renderLegend} align="right" verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.75"
            dot={false}
            activeDot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const renderLegend = () => {
  return (
    <p className="lineLegend">
      Durée moyenne des
      <br />
      sessions
    </p>
  );
};

const renderTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <p className="customLineToolTip">
        {payload[0].payload.sessionLength} min
      </p>
    );
  }
  return null;
};

const CustomCursor = (props) => {
  const { points, width, height } = props;
  const { x } = points[0];
  return (
    <Rectangle
      fill="rgba(0,0,0,0.1)"
      stroke="none"
      x={x}
      y={0}
      width={width}
      height={height}
    />
  );
};
