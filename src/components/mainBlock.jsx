import { useState, useEffect } from "react";
import { getWeatherIcon } from "../utils/weatherIcons";
import { MapPin } from "lucide-react";
import { Droplet, Wind } from "lucide-react";
import FooterCards from "./FooterCards";

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
        setTemperature(data.current.temperature_2m + "°C");
        setWind(data.current.wind_speed_10m + " km/h");
        setPrecipitation(data.current.precipitation + " mm");
        setWeatherCode(data.current.weathercode);
      });
  }, []);

  useEffect(() => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const updateTime = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
      setDay(weekday[d.getDay()]);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

 return (
  <main className="flex flex-col justify-between items-center w-screen h-screen text-center">
    <div className="location sticky flex justify-center items-start gap-2 mt-20 bg-white/10 p-2 rounded-xl border border-white/20">
      <MapPin />
      <p className="text-2xl">Opole, Poland</p>
    </div>

    <div className="weather flex justify-center items-center flex-1 mt-3">
      <div className="weather-container relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-[2rem] p-10 w-[350px] text-white text-center shadow-xl border-solid border-opacity-5">
        <div className="weather-container-item p-4 flex justify-center">
          <div className="flex items-center text-3xl">
            {weatherCode !== null && getWeatherIcon(weatherCode)}
          </div>
          <h1 className="text-6xl font-medium" id="temp">
            {temperature}
          </h1>
        </div>
        <div className="weather-container-item flex justify-center text-3xl gap-4 p-2">
          <p className="time" id="time">
            {time}
          </p>
          <p className="day" id="day">
            {day}
          </p>
        </div>

        <div className="weather-container-footer flex justify-center gap-4 p-2 text-md">
          <div className="flex bg-white/10 p-3 rounded-xl border border-white/20 gap-2">
            <div className="weather-container-item flex justify-center items-center gap-2">
              <Wind className="w-6 h-6 text-blue-400 " />
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

    <div className="mb-6">
      <FooterCards />
    </div>
  </main>
);

}

export default MainWindow;
