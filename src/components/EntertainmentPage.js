import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const pageStyle = {
  backgroundColor: "black",
  minHeight: "100vh",
  padding: "20px",
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  margin: "20px",
  marginTop: "300px",
};

const cardStyle = {
  backgroundColor: "white",
  color: "black",
  padding: "20px",
  borderRadius: "10px",
  margin: "10px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const imgStyle = {
  maxWidth: "100%",
  borderRadius: "10px",
  marginBottom: "10px",
};

function EntertainmentPage() {
  return (
    <div style={pageStyle}>
      <Link to="/"> {/* Link to the map page */}
        <button style={{ color: "white", backgroundColor: "gray", marginBottom: "20px", borderRadius: "10px", width: "80px", height: "50px",}}>
          Home
        </button>
      </Link>
      <div style={containerStyle}>
        {/* Your movie cards go here */}
        <div style={cardStyle}>
          <img
            src="url-to-movie-poster-image"
            alt="Movie Poster"
            style={imgStyle}
          />
          <h2>Movie Title</h2>
          <p>Age Rating: PG-13</p>
          <p>Running Time: 2h 15m</p>
        </div>
        <div style={cardStyle}>
          <img
            src="url-to-another-movie-poster-image"
            alt="Movie Poster"
            style={imgStyle}
          />
          <h2>Another Movie Title</h2>
          <p>Age Rating: R</p>
          <p>Running Time: 1h 45m</p>
        </div>
        <div style={cardStyle}>
          <img
            src="url-to-another-movie-poster-image"
            alt="Movie Poster"
            style={imgStyle}
          />
          <h2>Another Movie Title</h2>
          <p>Age Rating: R</p>
          <p>Running Time: 1h 45m</p>
        </div>
      </div>
    </div>
  );
}

export default EntertainmentPage;
