import React from "react";
import { FaLink } from "react-icons/fa"; // React Icon for Link

const NewsCard = ({ title, url }) => (
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
    <h4 style={{ fontSize: "1.2rem", color: "#ff5722" }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#ff5722",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        {title}
      </a>
    </h4>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#fff",
        textDecoration: "none",
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
      }}
    >
      <FaLink />
      Read More
    </a>
  </div>
);

export default NewsCard;
// This code defines a NewsCard component that displays a news article title and a link to read more. The card has a dark theme with a bold title and a link icon, making it visually appealing and easy to interact with. The card is styled using inline styles for simplicity.
