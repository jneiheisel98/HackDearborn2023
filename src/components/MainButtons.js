import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "70px",
  width: "100%",
  paddingRight: "20px",
};

const buttonStyle = {
  backgroundColor: "black",
  color: "white",
  padding: "20px 20px",
  borderRadius: "15px",
  cursor: "pointer",
  margin: "0 10px",
  marginRight: "20px",
  transition: "background-color 0.3s",
  textDecoration: 'none',
};

const MainButtons = ({ onCategorySelection }) => {
  // const [hoveredEntertainment, setHoveredEntertainment] = useState(false);
  // const [hoveredProductivity, setHoveredProductivity] = useState(false);

  // const handleMouseOverEntertainment = () => {
  //   setHoveredEntertainment(true);
  // };

  // const handleMouseOutEntertainment = () => {
  //   setHoveredEntertainment(false);
  // };

  // const handleMouseOverProductivity = () => {
  //   setHoveredProductivity(true);
  // };

  // const handleMouseOutProductivity = () => {
  //   setHoveredProductivity(false);
  // };

  return (
    <div style={buttonContainerStyle}>
      <Link to="/entertainment" style={buttonStyle}> {/* Add Link to the Entertainment route */}
        Entertainment
      </Link>
      <Link to="/productivity" style={buttonStyle}> {/* Add Link to the Productivity route */}
        Productivity
      </Link>
    </div>
  );
};

export default MainButtons;
