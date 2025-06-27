import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  TrafficLayer,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 34.0522,
  lng: -118.2437, // Los Angeles
};

const placesTypes = [
  { type: "electric_vehicle_charging_station", label: "EV Charging" },
  { type: "restaurant", label: "Restaurants" },
  { type: "hotel", label: "Hotels" },
  { type: "tourist_attraction", label: "Landmarks" },
];

const LiveDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [aqiData, setAqiData] = useState(null);
  const [userLocation, setUserLocation] = useState(defaultCenter);
  const [mapRef, setMapRef] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const debounceRef = useRef(null);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
      );
      const noonForecast = res.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setWeatherData(res.data.list[0]);
      setForecastData(noonForecast.slice(0, 5));
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
    }
  };

  const fetchAQI = async () => {
    try {
      const res = await axios.get(
        `https://api.waqi.info/feed/here/?token=${process.env.REACT_APP_AQI_API_KEY}`
      );
      if (res.data.status === "ok") {
        setAqiData(res.data.data);
      } else {
        console.warn("AQI API error:", res.data.data);
        setAqiData(null);
      }
    } catch (err) {
      console.error("Failed to fetch AQI data:", err);
    }
  };

const fetchNearbyPlaces = async (map) => {
  if (!window.google || !window.google.maps) {
    console.warn("Google Maps API not yet available.");
    return;
  }

  const service = new window.google.maps.places.PlacesService(map);
  const location = map.getCenter();

  const allPlaces = [];

  for (const placeType of placesTypes) {
    await new Promise((resolve) => {
      service.nearbySearch(
        {
          location,
          radius: 3000,
          type: placeType.type,
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) =>
              allPlaces.push({
                ...place,
                label: placeType.label,
              })
            );
          }
          resolve();
        }
      );
    });
  }

  setPlaces(allPlaces);
};


  const requestUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        fetchWeather(coords.lat, coords.lng);
      },
      () => {
        console.warn("Geolocation denied or unavailable. Using default.");
        fetchWeather(defaultCenter.lat, defaultCenter.lng);
      }
    );
  };

  useEffect(() => {
    requestUserLocation();
    fetchAQI();
  }, []);

  const onMapLoad = useCallback((map) => {
    setMapRef(map);
    fetchNearbyPlaces(map);
  }, []);

  const onMapIdle = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (mapRef) {
        setUserLocation({
          lat: mapRef.getCenter().lat(),
          lng: mapRef.getCenter().lng(),
        });
        fetchWeather(mapRef.getCenter().lat(), mapRef.getCenter().lng());
        fetchNearbyPlaces(mapRef);
      }
    }, 500);
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
const getAqiCategory = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};



  return (
    <section className="min-h-screen px-6 py-20 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-green-700 mb-8">
          Real-Time Urban Data Dashboard
        </h2>

        {/* Weather Box */}
        <div className="bg-blue-100 border border-blue-300 p-4 rounded mb-8 shadow">
          <h3 className="text-2xl font-semibold mb-2">
            Weather in {userLocation.lat.toFixed(2)}, {userLocation.lng.toFixed(2)}
          </h3>
          {weatherData ? (
            <>
              <p className="text-lg">
                🌡 {weatherData.main.temp}°F, {weatherData.weather[0].description}
              </p>
              <h4 className="mt-4 font-semibold">5-Day Forecast</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
  {forecastData.map((item, idx) => (
    <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm text-center">
      <h5 className="font-semibold text-green-700 mb-1">{formatDay(item.dt_txt)}</h5>
      <p className="text-lg font-bold">{Math.round(item.main.temp)}°F</p>
      <p className="text-sm capitalize text-gray-700">{item.weather[0].description}</p>
    </div>
  ))}
</div>

            </>
          ) : (
            <p>Loading current weather...</p>
          )}
        </div>

        {/* AQI */}
<div className="mb-12 bg-yellow-100 border border-yellow-300 p-4 rounded mb-8 shadow">
  <h3 className="text-2xl font-semibold mb-2">Air Quality Index</h3>
  {aqiData && typeof aqiData.aqi === 'number' ? (
    <p>
      AQI: {aqiData.aqi} ({getAqiCategory(aqiData.aqi)}) – {aqiData.dominentpol?.toUpperCase()}
    </p>
  ) : (
    <p>Air quality data is currently unavailable.</p>
  )}
</div>


        {/* Google Map */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Live Smart Map</h3>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={userLocation}
              zoom={13}
              onLoad={onMapLoad}
              onIdle={onMapIdle}
            >
              <TrafficLayer />
              {places.map((place, idx) => (
                <Marker
                  key={idx}
                  position={place.geometry.location}
                  title={place.name}
                  onClick={() => setSelectedPlace(place)}
                />
              ))}

              {selectedPlace && (
                <InfoWindow
                  position={selectedPlace.geometry.location}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="max-w-xs">
                    <h4 className="font-bold">{selectedPlace.name}</h4>
                    <p className="text-sm">{selectedPlace.vicinity}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Category: {selectedPlace.label}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </section>
  );
};

export default LiveDashboard;
