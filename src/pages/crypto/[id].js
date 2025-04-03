import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const CRYPTO_API_BASE = "https://api.coingecko.com/api/v3";

const CryptoDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCryptoDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${CRYPTO_API_BASE}/coins/${id}`);
        setCryptoData(res.data);
      } catch (err) {
        setError("Error fetching cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDetails();
  }, [id]);

  if (loading) return <p>Loading crypto data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{cryptoData.name} Details</h1>
      <p>Current Price: ${cryptoData.market_data.current_price.usd}</p>
      <p>Market Cap: ${cryptoData.market_data.market_cap.usd}</p>
      <p>24h Change: {cryptoData.market_data.price_change_percentage_24h}%</p>
    </div>
  );
};

export default CryptoDetails;
