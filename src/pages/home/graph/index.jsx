import { Radio } from 'antd';
import React, { useState,useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { options } from "../../../util";
import { handleDateOfDay,
  handleValueOfDay,
  handleDateOfWeek,
  handleValueOfWeek,
  handleDateOfMonth,
  handleValueOfMonth
 } from "../../../util/";
import "./graph.css";

function Graph({ }) {
  const dataHistoricalAll = useSelector(state => state.tracker.dataHistoricalAll);
  const [focus, setFocus] = useState("Day");

  const [dateCases, setDateCases] = useState([]);
  const [valueCases, setvalueCases] = useState([]);
  const [valueDeaths, setvalueDeaths] = useState([]);
  const [valueRecovered, setvalueRecovered] = useState([]);

  const handleFocusChange = e => {
    setFocus(e.target.value);
  };

  useEffect(() => {
      const dateCases = handleDateOfDay(dataHistoricalAll, "cases");
      const valueCases = handleValueOfDay(dataHistoricalAll, "cases");
      const valueDeaths = handleValueOfDay(dataHistoricalAll, "deaths");
      const valueRecovered = handleValueOfDay(dataHistoricalAll, "recovered");
  
      setDateCases(dateCases);
      setvalueCases(valueCases)
      setvalueDeaths(valueDeaths)
      setvalueRecovered(valueRecovered)
  },[dataHistoricalAll])

  const handleDataDay = () => {
    const dateCases = handleDateOfDay(dataHistoricalAll, "cases");
    const valueCases = handleValueOfDay(dataHistoricalAll, "cases");
    const valueDeaths = handleValueOfDay(dataHistoricalAll, "deaths");
    const valueRecovered = handleValueOfDay(dataHistoricalAll, "recovered");

    setDateCases(dateCases);
    setvalueCases(valueCases)
    setvalueDeaths(valueDeaths)
    setvalueRecovered(valueRecovered)
  };

  const handleDataWeek = () => {
    const dateCases = handleDateOfWeek(dataHistoricalAll, "cases");
    const valueCases = handleValueOfWeek(dataHistoricalAll, "cases");
    const valueDeaths = handleValueOfWeek(dataHistoricalAll, "deaths");
    const valueRecovered = handleValueOfWeek(dataHistoricalAll, "recovered");

    setDateCases(dateCases);
    setvalueCases(valueCases)
    setvalueDeaths(valueDeaths)
    setvalueRecovered(valueRecovered)
  };

  const handleDataMonth = () => {
    const dateCases = handleDateOfMonth(dataHistoricalAll, "cases");
    const valueCases = handleValueOfMonth(dataHistoricalAll, "cases");
    const valueDeaths = handleValueOfMonth(dataHistoricalAll, "deaths");
    const valueRecovered = handleValueOfMonth(dataHistoricalAll, "recovered");

    setDateCases(dateCases);
    setvalueCases(valueCases)
    setvalueDeaths(valueDeaths)
    setvalueRecovered(valueRecovered)
  };

  return (
    <div className="graph_line">
      <Radio.Group value={focus} onChange={handleFocusChange}>
        <Radio.Button
          onClick={handleDataDay}
          value="Day">Day</Radio.Button>
        <Radio.Button
          onClick={handleDataWeek}
          value="Week">Week</Radio.Button>
        <Radio.Button
          onClick={handleDataMonth}
          value="Month">Month</Radio.Button>
      </Radio.Group>
      <div className="graph_chart" style={{height:"300px"}}>
        <Line
          options={options}
          data={{
            labels: dateCases,
            datasets: [
              {
                fill: false,
                label: "Cases",
                borderColor: "#F46310",
                pointRadius: 0,
                data: valueCases
              },
              {
                fill: false,
                label: "Deaths",
                borderColor: "#4E1AE4",
                pointRadius: 0,
                data: valueDeaths
              },
              {
                fill: false,
                label: "Recovered",
                borderColor: "#14A958",
                pointRadius: 0,
                data: valueRecovered
              },
            ]
          }}
        />
      </div>
    </div>
  );
}

export default Graph;