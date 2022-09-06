import React, { useEffect, useState } from "react";
import SimpleBarChart from "../BarChart/BarChart";
import { ChartsWrapper } from "./ChartsStyle";

export default function Charts({ data }) {
  const [graphData, setGraphData] = useState([
    {
      title: null,
      pair: null,
      examplesCount: null,
    },
  ]);
  const [groupedData, setGroupedData] = useState();

  const groupByPair = graphData.reduce((group, _pair) => {
    const { pair } = _pair;
    group[pair] = group[pair] ?? [];
    group[pair].push(_pair);
    return group;
  }, {});

  useEffect(() => {
    let array = [];

    data?.map((d) => {
      array.push({
        title: d.title,
        pair: d.pair,
        examplesCount: d.examples.length,
      });
    });

    setGraphData(array);
  }, [data]);

  useEffect(() => {
    setGroupedData(groupByPair);
  }, [graphData]);

  return (
    <ChartsWrapper>
      <SimpleBarChart data={groupedData} />
    </ChartsWrapper>
  );
}
