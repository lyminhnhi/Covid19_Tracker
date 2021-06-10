import React, { useState, useEffect } from 'react';
import {
  MenuItem, FormControl, Select, Card, CardContent,
} from "@material-ui/core";
import "./home.css";
import axios from "axios";
import InfoBox from "./infoBox";
import Map from "./map";
import TableTracker from "./table";
import Graph from './graph';
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchAll, fetchHistoricalAll } from '../../slices/trackerSlice';

function Home() {
  const [country, setCountry] = useState('worldwide');
  const [mapCenter, setMapCenter] = useState({ lat: 38.548165, lng: 27.682045 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");
  const dispatch = useDispatch();
  const dataCountries = useSelector(state => state.tracker.dataCountries);
  const dataAll = useSelector(state => state.tracker.dataAll);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchAll("https://disease.sh/v3/covid-19/all"));
    dispatch(fetchHistoricalAll());
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    dispatch(fetchAll(url));
    await axios.get(url).then(response => {
      setCountry(countryCode);
      if (countryCode != "worldwide") {
        setMapCenter([response.data.countryInfo.lat, response.data.countryInfo.long]);
        setMapZoom(5);
      } else if (countryCode === "worldwide") {
        setMapCenter({ lat: 10.762622, lng: 106.660172 });
        setMapZoom(3);
      }
    });
  };

  return (
    <div className="tracker_container">
      <div className="form">
        <FormControl
          className="dropdown">
          <Select
            onChange={onCountryChange}
            variant="outlined"
            value={country}
          >
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {dataCountries.map((item) => (
              <MenuItem
                value={item.countryInfo.iso2}
                key={item.countryInfo._id}
              >{item.country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="info">
        <div className="info_box">
          <InfoBox
            title="Cases"
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            cases={numeral(dataAll.todayCases).format("0,0")}
            total={numeral(dataAll.cases).format("0,0")} />
        </div>
        <div className="info_box">
          <InfoBox
            title="Recoverd"
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            cases={numeral(dataAll.todayRecovered).format("0,0")}
            total={numeral(dataAll.recoverd).format("0,0")} />
        </div>
        <div className="info_box">
          <InfoBox
            title="Deaths"
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            cases={numeral(dataAll.todayDeaths).format("0,0")}
            total={numeral(dataAll.deaths).format("0,0")} />
        </div>
      </div>

      <div className="app_wrapper">
        <div className="table_tracker">
          <Card className="table_card">
            <CardContent className="table_content">
              <h3>Worldwide Table</h3>
              <TableTracker />
            </CardContent>
          </Card>
        </div>
        <div className="map">
          <Map
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom} />
        </div>
      </div>

      <div className="graph">
        <Card className="graph_card">
          <CardContent className="graph_content" >
            <h3>Worldwide Graph</h3>
            <Graph />
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

export default Home

