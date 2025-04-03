import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";
import { fetchCrypto } from "../redux/cryptoSlice";
import { fetchNews } from "../redux/newsSlice";
import { setupCryptoWebSocket } from "../utils/CryptoWebSocket";
import { setupWeatherAlerts } from "../utils/WeatherAlerts";
import { FaStar, FaRegStar, FaCloudSun, FaBitcoin } from "react-icons/fa"; // Importing necessary icons
import WeatherCard from "../components/Weather/WeatherCard";
import CryptoCard from "../components/Crypto/CryptoCard";
import NewsCard from "../components/News/NewsCard";

const Home = () => {
  const dispatch = useDispatch();

  const {
    data: weatherData,
    alerts: weatherAlerts = [],
    status: weatherStatus,
    favorites: favoriteCities,
  } = useSelector((state) => state.weather);

  const {
    data: cryptoData,
    status: cryptoStatus,
    favorites: favoriteCryptos,
  } = useSelector((state) => state.crypto);

  const { articles: newsData, status: newsStatus } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    const cities = ["New York", "London", "Tokyo"];
    cities.forEach((city) => dispatch(fetchWeather(city)));
    dispatch(fetchCrypto());
    dispatch(fetchNews());

    const cryptoWS = setupCryptoWebSocket(dispatch);
    setupWeatherAlerts(dispatch);

    return () => cryptoWS.close();
  }, [dispatch]);

  return (
    <main
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#ff5722", fontSize: "3rem" }}>
        CryptoWeather Nexus
      </h1>

      {/* Favorites Section */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>⭐ Favorites</h2>
        {favoriteCities.length === 0 && favoriteCryptos.length === 0 ? (
          <p style={{ color: "#bbb" }}>No favorites yet.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {/* Displaying favorite cities */}
            {favoriteCities.map((city, index) => {
              const cityData = weatherData.find((w) => w.city === city);
              return cityData ? (
                <WeatherCard key={index} {...cityData} />
              ) : null;
            })}

            {/* Displaying favorite cryptocurrencies */}
            {favoriteCryptos.map((cryptoId, index) => {
              const crypto = cryptoData.find((c) => c.id === cryptoId);
              return crypto ? <CryptoCard key={index} {...crypto} /> : null;
            })}
          </div>
        )}
      </section>

      {/* Weather Section */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          <FaCloudSun style={{ marginRight: "10px" }} />
          Weather
        </h2>
        {weatherStatus === "loading" ? (
          <p style={{ color: "#bbb" }}>Loading weather...</p>
        ) : weatherData.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {weatherData.map((cityData, index) => (
              <WeatherCard
                key={index}
                city={cityData.city}
                temp={cityData.temp}
                humidity={cityData.humidity}
                condition={cityData.condition}
              />
            ))}
          </div>
        ) : (
          <p style={{ color: "#bbb" }}>No weather data available.</p>
        )}

        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <div
            style={{
              backgroundColor: "#333",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "15px",
            }}
          >
            <h3 style={{ fontSize: "1.5rem" }}>Weather Alerts:</h3>
            <ul>
              {weatherAlerts.map((alert, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "1rem",
                    color: "#ff5722",
                    marginBottom: "5px",
                  }}
                >
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Cryptocurrency Section */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          <FaBitcoin style={{ marginRight: "10px" }} />
          Cryptocurrency
        </h2>
        {cryptoStatus === "loading" ? (
          <p style={{ color: "#bbb" }}>Loading cryptocurrency data...</p>
        ) : cryptoData.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {cryptoData.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                id={crypto.id}
                name={crypto.name}
                price={crypto.current_price}
                change={crypto.price_change_percentage_24h}
              />
            ))}
          </div>
        ) : (
          <p style={{ color: "#bbb" }}>No cryptocurrency data available.</p>
        )}
      </section>

      {/* News Section */}
      <section>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>📰 News</h2>
        {newsStatus === "loading" ? (
          <p style={{ color: "#bbb" }}>Loading news...</p>
        ) : newsData.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {newsData.map((news, index) => (
              <NewsCard key={index} title={news.title} url={news.link} />
            ))}
          </div>
        ) : (
          <p style={{ color: "#bbb" }}>No news articles available.</p>
        )}
      </section>
    </main>
  );
};

export default Home;
