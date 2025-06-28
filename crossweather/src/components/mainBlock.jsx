import { useState, useEffect } from "react";
import { getWeatherIcon } from "../utils/weatherIcons";
import { MapPin } from "lucide-react";
import { Droplet, Wind } from "lucide-react";

function MainWindow() {
  const [temperature, setTemperature] = useState("loading...");
  const [time, setTime] = useState("loading...");
  const [day, setDay] = useState("loading...");
  const [wind, setWind] = useState("loading...");
  const [precipitation, setPrecipitation] = useState("loading...");
  const [weatherCode, setWeatherCode] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=50.67211&longitude=17.92533&current=temperature_2m,wind_speed_10m,precipitation,weathercode"
    )
      .then((res) => res.json())
      .then((data) => {
        const weekday = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const d = new Date();
        const h = String(d.getHours()).padStart(2, "0");
        const m = String(d.getMinutes()).padStart(2, "0");
        const s = String(d.getSeconds()).padStart(2, "0");

        setTemperature(data.current.temperature_2m + "°C");
        setTime(`${h}:${m}:${s}`);
        setDay(weekday[d.getDay()]);

        setWind(data.current.wind_speed_10m + " km/h");
        setPrecipitation(data.current.precipitation + " mm");
        setWeatherCode(data.current.weathercode);
      });
  }, []);

  return (
    <main className="flex justify-center items-start text-center w-screen h-screen">
      <div className="location absolute flex justify-center items-center gap-2 mt-26">
        <MapPin />
        <p className="text-3xl">Opole, Poland</p>
      </div>
      <div className="window flex flex-col justify-between h-full">
        <div className="weather h-full flex justify-center items-center">
          <div className="weather-container">
            <div className="weather-container-item p-4 flex">
              <div className="flex items-center text-3xl">
                {weatherCode !== null && getWeatherIcon(weatherCode)}
              </div>
              <h1 className="text-6xl font-medium" id="temp">
                {temperature}
              </h1>
            </div>
            <div className="weather-container-item flex justify-center text-3xl gap-4">
              <p className="time" id="time">
                {time}
              </p>
              <p className="day" id="day">
                {day}
              </p>
            </div>

            <div className="weather-container-footer grid grid-cols-2 gap-4 text-xl text-center">
              <div className="weather-container-item flex justify-center items-center gap-2">
                <Wind className="w-6 h-6 text-blue-400" />
                <span>{wind}</span>
              </div>
              <div className="weather-container-item flex justify-center items-center gap-2">
                <Droplet className="w-6 h-6 text-cyan-500" />
                <span>{precipitation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainWindow;
