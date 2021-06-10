import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../../../util";
import { useSelector } from 'react-redux';
import "./map.css";

function Map({ casesType, center, zoom }) {
  const countries = useSelector(state => state.tracker.dataCountries)

  return (
    <div className="map_wrapper">
      <LeafletMap
        className="map_content"
        center={center}
        zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;