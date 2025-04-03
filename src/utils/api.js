import axios from "axios";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const CRYPTO_API_BASE = "https://api.coingecko.com/api/v3";

export const getWeather = async (city) => {
  try {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    return res.data;
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error);
    return null;
  }
};

export const getCryptoPrices = async () => {
  const res = await axios.get(`${CRYPTO_API_BASE}/coins/markets`, {
    params: { vs_currency: "usd", ids: "bitcoin,ethereum,cardano" },
  });
  return res.data;
};

export const getNews = async () => {
  const res = await axios.get(
    `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=crypto`
  );
  return res.data.results;
};

console.log("API KEY:", process.env.NEXT_PUBLIC_WEATHER_API_KEY);
