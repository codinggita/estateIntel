import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "./Map.css";
import logger from "../utils/logger";

const API_KEY = "AIzaSyCEW0bCq_jD9iZR5SIuWi9GXC8aZ-jiB_k";

const defaultCenter = { lat: 20.5937, lng: 78.9629 };

const MapComponent = ({ resources = [], selectedResourceId = null, onMarkerClick = null, externalUserLocation = null, shouldZoomToSelected = false }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);
  const [internalUserLocation, setInternalUserLocation] = useState(null);
  
  // Use external location if provided, else internal
  const userLocation = externalUserLocation || internalUserLocation;
  const safeResources = Array.isArray(resources) ? resources : [];
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
        setInternalUserLocation(newPos);
        
        if (map) {
          map.panTo(newPos);
          map.setZoom(15);
        }

        // Keep tracking live
        if (!watchIdRef.current) {
          watchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
              setInternalUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            },
            (error) => logger.warn("Watch position error:", error),
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

  // Effect to handle zooming into a selected resource
  React.useEffect(() => {
    if (map && selectedResourceId && shouldZoomToSelected && safeResources.length > 0) {
      const selected = safeResources.find(r => r.id === selectedResourceId);
      if (selected) {
        map.panTo({ lat: selected.latitude, lng: selected.longitude });
        map.setZoom(16);
      }
    }
  }, [map, selectedResourceId, safeResources, shouldZoomToSelected]);

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
        zoom={userLocation ? 14 : 5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapId: '8ece33f178716766',
          disableDefaultUI: false,
          clickableIcons: true,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {userLocation && (
          <Marker 
            position={userLocation} 
            title="You are here" 
            options={{
              zIndex: 100
            }}
          />
        )}
        
        {safeResources.map(res => (
          <Marker
            key={res.id}
            position={{ lat: res.latitude, lng: res.longitude }}
            title={res.name}
            onClick={() => onMarkerClick && onMarkerClick(res)}
          />
        ))}
        
        {!safeResources.length && !userLocation && (
           <Marker position={defaultCenter} title="Default Center" />
        )}
      </GoogleMap>

      <button className="locate-me-btn" onClick={handleLocateMeClick}>
         📍 {userLocation ? "Live Tracking" : "Locate Me"}
      </button>
    </div>
  );
};

export default MapComponent;
