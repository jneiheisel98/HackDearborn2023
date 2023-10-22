import React, { useState, useEffect } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from '../constants/index';
import MainButtons from "./MainButtons"; 

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '90vh'
};

const buttonStyle = {
  position: 'absolute',
  top: '25px',
  left: '300px',
  zIndex: 1,
  backgroundColor: '#6089E9',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
};

const inputStyle = {
  position: 'absolute',
  top: '25px',
  left: '70px',
  width: '200px',
  zIndex: 1,
  backgroundColor: 'white',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '15px',
};

function DistanceCalculator() {
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState("");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [directionsService, setDirectionsService] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [directionsOptions, setDirectionsOptions] = useState({
    destination: destinationAddress,
    origin: userLocation || destinationAddress,
    travelMode: 'DRIVING',
  });

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleDestinationChange = (event) => {
    setDestinationAddress(event.target.value);
  };

  const handleGetDirections = () => {
    if (destinationAddress.trim() === "") {
      alert("Please enter a valid destination address.");
      return;
    }

    if (!isLoaded) {
      alert("Google Maps API is still loading. Please wait a moment and try again.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: destinationAddress }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const destinationCoordinates = results[0].geometry.location;
        const updatedDirectionsOptions = {
          destination: destinationCoordinates,
          origin: userLocation || destinationCoordinates,
          travelMode: 'DRIVING',
        };
        setDirectionsOptions(updatedDirectionsOptions);

        if (directionsService) {
          directionsService.route({ request: "any unused request" }, () => {});
        }

        const newDirectionsService = new window.google.maps.DirectionsService();
        newDirectionsService.route(updatedDirectionsOptions, (result, status) => {
          if (status === 'OK') {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        });

        setDirectionsService(newDirectionsService);

        // Set formSubmitted to true
        setFormSubmitted(true);
      } else {
        alert("Unable to geocode the destination address. Please try a different address.");
      }
    });
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGetDirections();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter destination address"
        value={destinationAddress}
        onChange={handleDestinationChange}
        onKeyPress={handleInputKeyPress}
        style={inputStyle}
      />
      <button onClick={handleGetDirections} style={buttonStyle}>
        GO
      </button>
      {formSubmitted && (
        <MainButtons onCategorySelection={handleCategorySelection} />
      )}
      <div style={{ textAlign: 'center' }}>
        {distance && <p>Distance: {distance}</p>}
        {duration && <p>Duration: {duration}</p>}
      </div>

      {isLoaded && (
        <div className="w-full h-screen">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || { lat: 0, lng: 0 }}
            zoom={10}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      )}
    </div>
  );
}

export default DistanceCalculator;
