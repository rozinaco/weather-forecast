import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { dict } from "./Weathercode";
import { Button, InputGroup, FormControl, Card } from "react-bootstrap";
import { FaSearchLocation } from "react-icons/fa";

function App() {
  const [temperature, setTemperature] = useState();
  const [weatherCode, setWeatherCode] = useState();
  const [search, setSearch] = useState();
  const isMobile = window.innerWidth < 720;

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
      {[
        51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99,
      ].includes(weatherCode) ? (
        <img
          className="rain"
          src="https://media.giphy.com/media/PspWBxW4y3Kfu/giphy-downsized-large.gif"
          alt="rain"
        />
      ) : [71, 73, 75, 77, 85, 86].includes(weatherCode) ? (
        <img
          className="snow"
          src="https://i.pinimg.com/originals/27/73/cc/2773cc630bdb2060ff28a7d2902e926d.gif"
          alt="snow"
        />
      ) : isMobile ? (
        <img className="staticPhone" src="staticphone.jpg" />
      ) : (
        <video autoPlay loop muted className="default">
          <source src="Default.mp4" type="video/mp4" />
        </video>
      )}

      <div className="forecast">
        <div className="tint">
          <Card.Title
            style={{
              fontSize: "50px",
              fontFamily: "Abril Fatface, cursive",
            }}
          >
            {dict[weatherCode]?.weather}
          </Card.Title>
          <Card.Text className="temp">{temperature} ºC </Card.Text>
        </div>
      </div>
      <div className="form">
        <InputGroup className="mb-3">
          <FormControl
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />
          <Button variant="dark" id="button-addon2" onClick={getWeather}>
            <FaSearchLocation />
          </Button>
        </InputGroup>
      </div>
      <footer>Created by Rozina Hussain</footer>
    </div>
  );
}

export default App;
