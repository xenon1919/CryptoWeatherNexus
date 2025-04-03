import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteCrypto } from "../../redux/cryptoSlice";
import { FaStar, FaRegStar } from "react-icons/fa"; // React Icons for Favorite

const CryptoCard = ({ id, name, price, change }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.crypto.favorites);
  const isFavorite = favorites.includes(id);

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
      <h3 style={{ fontSize: "1.5rem", color: "#ff5722" }}>{name}</h3>
      <p style={{ fontSize: "1.2rem", color: "#fff" }}>
        Price: ${Number(price) ? Number(price).toFixed(2) : "N/A"}
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          color: change > 0 ? "#4caf50" : "#f44336",
        }}
      >
        24h Change: {Number(change) ? Number(change).toFixed(2) : "N/A"}%
      </p>
      <button
        onClick={() => dispatch(toggleFavoriteCrypto(id))}
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

export default CryptoCard;
// // This code defines a CryptoCard component that displays cryptocurrency information, including the name, price, and 24-hour change percentage. It also allows users to toggle the cryptocurrency as a favorite using Redux for state management. The card is styled with a dark theme and includes icons for favorite functionality.
