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
      <h1>Weather</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top"  src={dict[weatherCode]?.image.url} alt={dict[weatherCode].image.alt} />
        <Card.Body>
          <Card.Title>Forecast</Card.Title>
          <Card.Text>
            search forecast
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <p>Temperature:{temperature} </p>
      <p>Code:{dict[weatherCode]?.weather}</p>
      <footer>Created by Rozina Hussain</footer>
    </div>
  );
}

export default App;
