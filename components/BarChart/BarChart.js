import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./BarChart.module.css";

export default function ChartComponent({ data }) {
  return (
    <React.Fragment>
      {data &&
        Object.entries(data).map((item, i) => {
          let _tempItem = [...item[1]];
          console.log("temp Item ", _tempItem);
          console.log(item[1]);
          return (
            <ResponsiveContainer
              width="49%"
              aspect={2}
              debounce={1}
              key={i}
              className={styles.rechartsSurface}
            >
              <BarChart
                width={500}
                height={300}
                data={_tempItem}
                margin={{
                  top: 72,
                  right: 28,
                  left: 28,
                  bottom: 20,
                }}
              >
                <text
                  x={"50%"}
                  y={30}
                  fill="black"
                  textAnchor="middle"
                  width={100}
                  dominantBaseline="central"
                >
                  <tspan className="pair-text">{_tempItem[0].pair}</tspan>
                </text>
                <XAxis
                  dataKey="title"
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 0]}
                />
                <YAxis axisLine={false} tickLine={false} interval={0} />
                <Tooltip />
                <Bar dataKey="examplesCount" fill="#1E87FF" />
              </BarChart>
            </ResponsiveContainer>
          );
        })}
    </React.Fragment>
  );
}
