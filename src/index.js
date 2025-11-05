import "./styles.css";
import { WeatherAPI } from "./weatherAPI";
import { ViewController } from "./view";

const weatherData = WeatherAPI.getWeatherData("porto")
weatherData.then(function(data) {
    new ViewController(data);
})