// Fetches the user's current exact location for the button click event
export const getInitialLocation = (onSuccess, onError) => {
  if (!navigator.geolocation) {
    onError("Geolocation is not supported by your browser");
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      onSuccess({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      onError("Location permission denied. Please enable access.");
    },
    { enableHighAccuracy: true } // Ensures precise location instead of cell tower approximation
  );
};

// Optional: Automatically watches for location changes as the user moves
export const watchLiveLocation = (onSuccess, onError) => {
  if (!navigator.geolocation) return null;
  
  return navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => console.warn("Live location tracking error: ", error),
    { enableHighAccuracy: true, maximumAge: 10000 }
  );
};

// Stops live tracking to prevent memory leaks
export const clearLocationWatch = (watcherId) => {
  if (navigator.geolocation && watcherId) {
    navigator.geolocation.clearWatch(watcherId);
  }
};
