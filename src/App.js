import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { dict } from "./Weathercode";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

function App() {
  const [temperature, setTemperature] = useState();
  const [weatherCode, setWeatherCode] = useState();
  const [search, setSearch] = useState();

  function getWeather() {
    const urlCity =
      "https://geocoding-api.open-meteo.com/v1/search?name=" + search;
    fetch(urlCity)
      .then((data) => data.json())
      .then((jsonData) => {
        const longitude = jsonData.results[0].longitude;
        const latitude = jsonData.results[0].latitude;
        const urlForecast =
          "https://api.open-meteo.com/v1/forecast?current_weather=true&timezone=Europe%2FLondon&longitude=" +
          longitude +
          "&latitude=" +
          latitude;
        fetch(urlForecast)
          .then((data) => data.json())
          .then((jsonData) => {
            console.log(jsonData);
            setTemperature(jsonData.current_weather.temperature);
            setWeatherCode(jsonData.current_weather.weathercode);
          });
      });
  }

  return (
    <div className="App">
      <div className="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
      </div>

      <div className="forecast">
        <img
          className="img"
          src={dict[weatherCode]?.image.url}
          alt={dict[weatherCode]?.image.alt}
        />
        <div>
          <Card.Title
            style={{
              fontSize: "50px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {dict[weatherCode]?.weather}
          </Card.Title>
          <Card.Text className="temp">{temperature} ºC </Card.Text>
        </div>
      </div>
      <div className="form">
        <input
          onChange={(e) => setSearch(e.target.value)}
          id="Search"
          type="text"
          placeholder="Search city here..."
        />
        <button id="clear" onClick={getWeather}>
          Go
        </button>
      </div>

      <footer>Created by Rozina Hussain</footer>
    </div>
  );
}

export default App;
