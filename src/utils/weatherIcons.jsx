import {
  Sun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudSun,
} from 'lucide-react';

export function getWeatherIcon(code) {
  if (code === 0) return <Sun />;
  if (code >= 1 && code <= 3) return <CloudSun />;
  if (code >= 45 && code <= 48) return <CloudFog />;
  if (code >= 51 && code <= 57) return <CloudDrizzle />;
  if (code >= 61 && code <= 67) return <CloudRain />;
  if (code >= 71 && code <= 77) return <CloudSnow />;
  if (code >= 80 && code <= 82) return <CloudRain />;
  if (code >= 95 && code <= 99) return <CloudLightning />;
  return <Cloud />;
}