import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const WeatherDetails = () => {
  const router = useRouter();
  const { city } = router.query;
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeatherHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        setWeatherHistory(res.data.list);
      } catch (err) {
        setError("Error fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherHistory();
  }, [city]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Weather History for {city}</h1>
      <canvas id="weatherChart"></canvas>
      <ul>
        {weatherHistory.slice(0, 5).map((entry, index) => (
          <li key={index}>
            <strong>{new Date(entry.dt_txt).toLocaleString()}</strong>:{" "}
            {entry.main.temp}°C, {entry.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDetails;
