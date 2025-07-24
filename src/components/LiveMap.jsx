import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMemo } from "react";
const LIBRARIES = ["places"]; 

const containerStyle = {
  width: "100%",
  height: "500px",
};


const placeTypes = [
  "electric_vehicle_charging_station",
  "restaurant",
  "hotel",
  "tourist_attraction",
];

const LiveMap = ({ lat, lng, googleKey }) => {
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

const { isLoaded } = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: googleKey,
  libraries: LIBRARIES,
});


  const mapRef = useRef();
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
const [userLocation, setUserLocation] = useState(null);


  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const fetchPlaces = (location) => {
    console.log("Fetching nearby places for location:", location);

  if (!mapRef.current) return;

  const service = new window.google.maps.places.PlacesService(mapRef.current);
  const resultsSet = new Map();
  let completedTypes = 0;

  placeTypes.forEach((type) => {
    service.nearbySearch(
      {
        location,
        radius: 3000,
        type,
      },
      (results, status) => {
        completedTypes++;

        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place) => {
            if (!resultsSet.has(place.place_id)) {
              resultsSet.set(place.place_id, place);
            }
          });
        }

        // ✅ Only setPlaces once all types have finished
        if (completedTypes === placeTypes.length) {
          setPlaces(Array.from(resultsSet.values()));
        }
      }
    );
  });
};

useEffect(() => {
  if (userLocation) {
    console.log("User location (not used yet):", userLocation);
  }
}, [userLocation]);

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userLoc);
        mapRef.current?.panTo(userLoc);
        mapRef.current?.setZoom(13);
        fetchPlaces(userLoc); // ✅ call right after map loads and user location is known
      },
      (err) => {
        console.warn("Geolocation failed:", err.message);
        // fallback to provided lat/lng
        const fallback = { lat, lng };
        setUserLocation(fallback);
        mapRef.current?.panTo(fallback);
        mapRef.current?.setZoom(13);
        fetchPlaces(fallback);
      }
    );
  } else {
    console.warn("Geolocation not supported");
    const fallback = { lat, lng };
    setUserLocation(fallback);
    mapRef.current?.panTo(fallback);
    mapRef.current?.setZoom(13);
    fetchPlaces(fallback);
  }
}, [isLoaded, lat, lng]);



const handleMarkerClick = (place) => {
  const service = new window.google.maps.places.PlacesService(mapRef.current);

  if (!place.place_id) {
    console.warn("Missing place_id for:", place);
    return;
  }

  service.getDetails({ placeId: place.place_id }, (details, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      console.log("Place details:", details);
      setSelectedPlace(details);
    } else {
      console.error("Failed to load place details:", status, place.place_id);
    }
  });
};


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onDragEnd={() => {
        const newCenter = mapRef.current.getCenter();
        const location = {
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        };
        setPlaces([]); // clear existing
        fetchPlaces(location);
      }}
    >
      {places.map((place) => (
        <Marker
          key={place.place_id}
          position={place.geometry.location}
          title={place.name}
          onClick={() => handleMarkerClick(place)}
        />
      ))}

      {selectedPlace && (
        <InfoWindow
          position={selectedPlace.geometry.location}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div className="max-w-xs text-sm">
            <strong className="text-md">{selectedPlace.name}</strong>
          <img
  src={
    selectedPlace.photos?.[0]?.getUrl
      ? selectedPlace.photos[0].getUrl({ maxWidth: 200 })
      : "/placeholder.jpg"
  }
  alt={selectedPlace.name}
/>

            <p><strong>Rating:</strong> ⭐ {selectedPlace.rating} ({selectedPlace.user_ratings_total})</p>
            <p><strong>Price:</strong> {selectedPlace.price_level ? "$".repeat(selectedPlace.price_level) : "N/A"}</p>
            <p><strong>Address:</strong> {selectedPlace.formatted_address || selectedPlace.vicinity}</p>
            <p><strong>Phone:</strong> {selectedPlace.formatted_phone_number || "N/A"}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
};

export default LiveMap;
