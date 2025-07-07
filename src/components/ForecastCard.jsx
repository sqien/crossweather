import { getWeatherIcon } from "../utils/weatherIcons";
import { Droplet } from "lucide-react";

export default function ForecastCard({ date, min, max, rain, code }) {
  const weekday = new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
  });

  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 flex flex-col items-center gap-1">
      <div className="text-4xl">{getWeatherIcon(code)}</div>
      <p className="font-semibold">{weekday}</p>
      <p>
        {Math.round(min)}° / {Math.round(max)}°
      </p>
      <p className="text-sm flex items-center gap-1">
        <Droplet className="w-4 h-4" /> {rain} mm
      </p>
    </div>
  );
}
