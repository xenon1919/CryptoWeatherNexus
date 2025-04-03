import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteWeather } from "../../redux/weatherSlice";
import { FaStar, FaRegStar } from "react-icons/fa"; // React Icons for Favorite

const WeatherCard = ({ city, temp, humidity, condition }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.weather.favorites);
  const isFavorite = favorites.includes(city);

  return (
    <div
      className="card"
      style={{
        backgroundColor: "#1c1c1c",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        width: "250px",
        margin: "15px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h3 style={{ fontSize: "1.5rem", color: "#ff5722" }}>{city}</h3>
      <p style={{ fontSize: "1.2rem", color: "#fff" }}>Temperature: {temp}°C</p>
      <p style={{ fontSize: "1.2rem", color: "#fff" }}>Humidity: {humidity}%</p>
      <p style={{ fontSize: "1.2rem", color: "#fff" }}>
        Condition: {condition}
      </p>
      <button
        onClick={() => dispatch(toggleFavoriteWeather(city))}
        style={{
          backgroundColor: "#ff5722",
          border: "none",
          padding: "10px 20px",
          color: "#fff",
          borderRadius: "6px",
          fontSize: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {isFavorite ? <FaStar /> : <FaRegStar />}{" "}
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};

export default WeatherCard;
// This code defines a WeatherCard component that displays weather information for a specific city. It includes the city name, temperature, humidity, and weather condition. The card also has a button to toggle the city as a favorite, using Redux to manage the state of favorite cities.
