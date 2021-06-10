import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import "./detail.css";
import { fetchDetailCountry } from '../../slices/trackerSlice';
import numeral from "numeral";
import { Line } from "react-chartjs-2";
import { options } from "../../util";
import axios from "axios";
import { handleDateOfDay,
  handleValueOfDay,
  handleDateOfWeek,
  handleValueOfWeek,
  handleDateOfMonth,
  handleValueOfMonth
 } from "../../util";
import { Radio } from 'antd';

export const Detail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const dataDetail = useSelector(state => state.tracker.dataDetail);
  const [dataHistoricalCountry, setDataHistoricalCountry] = useState({});

  const [dateCases, setDateCases] = useState([]);
  const [valueCases, setvalueCases] = useState([]);
  const [valueDeaths, setvalueDeaths] = useState([]);
  const [valueRecovered, setvalueRecovered] = useState([]);
  const [focus, setFocus] = useState("Day");

  useEffect(() => {
    dispatch(fetchDetailCountry(id))
    axios.get(`https://disease.sh/v3/covid-19/historical/${id}?lastdays=all`)
      .then(response => setDataHistoricalCountry(response.data.timeline))
  }, [])

  const handleFocusChange = e => {
    setFocus(e.target.value);
  };

  useEffect(() => {
    const dateCases = handleDateOfDay(dataHistoricalCountry, "cases");
    const valueCases = handleValueOfDay(dataHistoricalCountry, "cases");
    const valueDeaths = handleValueOfDay(dataHistoricalCountry, "deaths");
    const valueRecovered = handleValueOfDay(dataHistoricalCountry, "recovered");

    setDateCases(dateCases);
    setvalueCases(valueCases)
    setvalueDeaths(valueDeaths)
    setvalueRecovered(valueRecovered)
  }, [dataHistoricalCountry])

  const handleDataDay = () => {
    const dateCases = handleDateOfDay(dataHistoricalCountry, "cases");
    const valueCases = handleValueOfDay(dataHistoricalCountry, "cases");
    const valueDeaths = handleValueOfDay(dataHistoricalCountry, "deaths");
    const valueRecovered = handleValueOfDay(dataHistoricalCountry, "recovered");

    setDateCases(dateCases);
    setvalueCases(valueCases)
    setvalueDeaths(valueDeaths)
    setvalueRecovered(valueRecovered)
  };

  const handleDataWeek = () => {
    const dateCases = handleDateOfWeek(dataHistoricalCountry, "cases");
    const valueCases = handleValueOfWeek(dataHistoricalCountry, "cases");
    const valueDeaths = handleValueOfWeek(dataHistoricalCountry, "deaths");
    const valueRecovered = handleValueOfWeek(dataHistoricalCountry, "recovered");

    setDateCases(dateCases);
    setvalueCases(valueCases)
    setvalueDeaths(valueDeaths)
    setvalueRecovered(valueRecovered)
  };

  const handleDataMonth = () => {
    const dateCases = handleDateOfMonth(dataHistoricalCountry, "cases");
    const valueCases = handleValueOfMonth(dataHistoricalCountry, "cases");
    const valueDeaths = handleValueOfMonth(dataHistoricalCountry, "deaths");
    const valueRecovered = handleValueOfMonth(dataHistoricalCountry, "recovered");

    setDateCases(dateCases);
    setvalueCases(valueCases)
    setvalueDeaths(valueDeaths)
    setvalueRecovered(valueRecovered)
  };

  return (
    <div className="detail">
      <div className="info_logo">
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <h3 style={{ color: "black" }}>{id}</h3>
            <img src={dataDetail.countryInfo?.flag}></img>
          </CardContent>
        </Card>
      </div>
      <div className="detail_info">
        <Card className="infoBox">
          <CardContent className="infoBox_content">
            <Typography
              className="infoBox_title"
              color="textSecondary">Cases</Typography>
            <h2>{numeral(dataDetail.todayCases).format("0,0")}</h2>
            <Typography
              className="infoBox_total"
              color="textSecondary">Total</Typography>
            <h2>{numeral(dataDetail.cases).format("0,0")}</h2>
          </CardContent>
        </Card>
        <Card className="infoBox">
          <CardContent className="infoBox_content">
            <Typography
              className="infoBox_title"
              color="textSecondary">Recovered</Typography>
            <h2>{numeral(dataDetail.todayRecovered).format("0,0")}</h2>
            <Typography
              className="infoBox_total"
              color="textSecondary">Total</Typography>
            <h2>{numeral(dataDetail.recovered).format("0,0")}</h2>
          </CardContent>
        </Card>
        <Card className="infoBox">
          <CardContent className="infoBox_content">
            <Typography
              className="infoBox_title"
              color="textSecondary">Deaths</Typography>
            <h2>{numeral(dataDetail.todayDeaths).format("0,0")}</h2>
            <Typography
              className="infoBox_total"
              color="textSecondary">Total</Typography>
            <h2>{numeral(dataDetail.deaths).format("0,0")}</h2>
          </CardContent>
        </Card>
      </div>

      <div className="detail_graph" style={{marginBottom:"10px"}}>
        <Card>
          <CardContent>
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
            <div className="graph_chart"
            style={{height:"300px"}}>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

