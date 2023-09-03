/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://disease.sh/v3/covid-19/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries.map((country) => (
        <Marker
          key={country.countryInfo._id ?? Date.now().toString(36)}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup key={country.countryInfo._id ?? Date.now().toString(36)}>
            <div>
              <h2>{country.country}</h2>
              <p>Active: {country.active}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;