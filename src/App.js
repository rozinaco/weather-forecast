import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { dict } from "./Weathercode";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";


function App() {
  const [temperature, setTemperature] = useState();
  const [weatherCode, setWeatherCode] = useState();
  const [card, setCard] = useState();
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&current_weather=true&timezone=Europe%2FLondon";

  fetch(url)
    .then((data) => data.json())
    .then((res) => {
      setTemperature(res.current_weather.temperature);
      setWeatherCode(res.current_weather.weathercode);
      console.log(
        res.current_weather.temperature,
        res.current_weather.weathercode
      );
    });
 
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
        <img className="img"
          src={dict[weatherCode]?.image.url}
          alt={dict[weatherCode]?.image.alt}
        />
        <div>
          <Card.Title style={{fontSize: "50px", fontFamily: "Arial, Helvetica, sans-serif"}}>{dict[weatherCode]?.weather}</Card.Title>
          <Card.Text className="temp">{temperature} ºC </Card.Text>
        </div>
      </div>
      <form className="form">
      <input id="Search" type="text" class="input" placeholder="Search city here..." />
      <button id="clear" class="go">Go</button>
      </form>
              

      <footer>Created by Rozina Hussain</footer>
    </div>
  );
}

export default App;
