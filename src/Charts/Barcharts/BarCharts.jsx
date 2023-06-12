import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Barcharts.scss";
import "../../Utils/Styles/_Variables.scss";

export default function BarCharts({ data }) {
  return (
    <>
      {data && (
        <div className="barCharts">
          <div className="barCharts__mainContainer">
            <div className="barCharts__container">
              <p className="barCharts-title">Activité quotidienne</p>
              <div className="barCharts-legend">
                <div className="barCharts-legend__weight">
                  <div className="blackDot"></div>
                  <p className="legend-weight">Poids (kg)</p>
                </div>
                <div className="barCharts-legend__calories">
                  <div className="redDot"></div>
                  <p className="legend-calories">Calories brûlées (kCal)</p>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 50,
                  right: 70,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="2 2" vertical={false} />
                <XAxis
                  dataKey="index"
                  tickLine={false}
                  axisLine={true}
                  type="number"
                  interval={0}
                  tickCount={data.length}
                  domain={["dataMin", "dataMax "]}
                  dy={20}
                  padding={{ right: 12, left: 12 }}
                  tick={{ stroke: "#9B9EAC", strokeWidth: 0.2 }}
                />
                <YAxis
                  dataKey="kilogram"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  domain={["dataMin - 2", "dataMax + 1"]}
                  yAxisId="kilogram"
                  type="number"
                  padding={{ left: 50 }}
                  dx={70}
                  interval={1}
                  tick={{ stroke: "#9B9EAC", strokeWidth: 0.2 }}
                />
                <YAxis
                  dataKey="calories"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  domain={["dataMin - 100", "dataMax + 100"]}
                  hide={true}
                  yAxisId="calories"
                  type="number"
                  padding={{ left: 50 }}
                  dx={70}
                />
                <Tooltip
                  animationEasing="ease-out"
                  content={<CustomTooltip payload={data} />}
                  offset={40}
                  wrapperStyle={{ outline: "none" }}
                />

                <Legend />
                <Bar
                  dataKey="kilogram"
                  fill="#282D30"
                  radius={[10, 10, 0, 0]}
                  barSize={10}
                  yAxisId="kilogram"
                />
                <Bar
                  dataKey="calories"
                  fill="#E60000"
                  radius={[10, 10, 0, 0]}
                  barSize={10}
                  yAxisId="calories"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}

const CustomTooltip = (active) => {
  let kilogramData = null;
  let caloriesData = null;

  for (let payloadValue of active.payload) {
    kilogramData = payloadValue.payload.kilogram;
    caloriesData = payloadValue.payload.calories;
  }

  const payloadIsEmpty = !active.payload.length;

  if (payloadIsEmpty) {
    return null;
  }

  return (
    <div className="tool-tip__bar-chart">
      <p className="tool-tip__bar-chart-text"> {`${kilogramData}kg`}</p>
      <p className="tool-tip__bar-chart-text"> {`${caloriesData}Kcal`}</p>
    </div>
  );
};
