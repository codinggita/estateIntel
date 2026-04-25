import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "./Map.css";

const API_KEY = "AIzaSyCEW0bCq_jD9iZR5SIuWi9GXC8aZ-jiB_k";

const defaultCenter = { lat: 20.5937, lng: 78.9629 };

const MapComponent = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const watchIdRef = useRef(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleLocateMeClick = () => {
    setErrorMsg("");
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newPos);
        
        if (map) {
          map.panTo(newPos);
          map.setZoom(15);
        }

        // Keep tracking live
        if (!watchIdRef.current) {
          watchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
              setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            },
            (error) => console.warn("Watch position error:", error),
            { enableHighAccuracy: true, maximumAge: 10000 }
          );
        }
      },
      (error) => setErrorMsg("Location permission denied. Please enable access."),
      { enableHighAccuracy: true }
    );
  };

  React.useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  if (loadError) {
    return <div className="map-container-wrapper flex items-center justify-center p-6 text-center text-red-600 bg-red-50 font-bold">Error loading maps! Your specific API key is either invalid or missing a billing account in Google Cloud.</div>;
  }

  if (!isLoaded) {
    return <div className="map-container-wrapper flex items-center justify-center font-bold">Loading Google Maps...</div>;
  }

  return (
    <div className="map-container-wrapper">
      {errorMsg && <div className="location-error-toast">{errorMsg}</div>}
      
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={userLocation || defaultCenter}
        zoom={userLocation ? 15 : 5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker 
          position={userLocation || defaultCenter} 
          title={userLocation ? "You are here" : "Default Location"} 
        />
      </GoogleMap>

      <button className="locate-me-btn" onClick={handleLocateMeClick}>
         📍 {userLocation ? "Live Tracking" : "Locate Me"}
      </button>
    </div>
  );
};

export default MapComponent;
