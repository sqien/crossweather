import { useState, useEffect } from "react";
import ForecastCard from "./ForecastCard";

function FooterCards() {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=50.67211&longitude=17.92533&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,weathercode&timezone=auto"
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.daily) {
          console.error("⛔", data);
          return;
        }

        const daysArr = data.daily.time.map((date, i) => ({
          date,
          min: data.daily.temperature_2m_min[i],
          max: data.daily.temperature_2m_max[i],
          rain: data.daily.precipitation_sum[i],
          code: data.daily.weathercode[i],
        }));

        console.log("✅", daysArr.slice(1));
        setForecast(daysArr.slice(1)); 
      })
      .catch((err) => {
        console.error("❌", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-8">
      {forecast.length === 0 ? (
        <p className="text-white">loading...</p>
      ) : (
        forecast.map((day) => <ForecastCard key={day.date} {...day} />)
      )}
    </div>
  );
}

export default FooterCards;
