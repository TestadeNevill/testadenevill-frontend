import { useEffect, useState } from "react";
import LiveMap from "../components/LiveMap";


const LiveDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Try user location first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchData(coords.latitude, coords.longitude);
        },
        () => fetchData() // fallback to default
      );
    } else {
      fetchData();
    }
  }, []);

const fetchData = async (lat = 34.0522, lng = -118.2437) => {
  try {
    const API_BASE = process.env.REACT_APP_API_BASE_URL;
    const res = await fetch(`${API_BASE}/api/live-dashboard?lat=${lat}&lng=${lng}`);
    const text = await res.text(); // <- TEMP: use text to debug
    console.log("Raw response text:", text); // <- see what you really got
    const json = JSON.parse(text); // Try to parse it manually
    setData(json);
  } catch (err) {
    console.error("Failed to load dashboard:", err);
  }
};


  if (!data) return <p className="p-10">Loading dashboard...</p>;

  const { city, weather, forecast, aqi, lat, lng, googleKey } = data;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Live Dashboard – {city}</h1>

      <div className="bg-blue-100 p-4 rounded mb-8 shadow">
        <h2 className="text-2xl font-semibold mb-2">Weather Now</h2>
        <p>🌡 {weather.main.temp}°F – {weather.weather[0].description}</p>
        <h3 className="mt-4 font-semibold">5-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {forecast.map((day, i) => (
            <div key={i} className="bg-green-50 p-4 text-center rounded shadow">
              <h4 className="text-green-700 font-semibold">{day.day}</h4>
              <p className="font-bold text-lg">{day.temp}°F</p>
              <p className="text-sm capitalize">{day.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded shadow mb-8">
        <h2 className="text-2xl font-semibold mb-2">Air Quality Index (AQI)</h2>
        {aqi && typeof aqi.aqi === "number" ? (
          <p>AQI: {aqi.aqi} – {aqi.dominentpol?.toUpperCase()}</p>
        ) : (
          <p className="text-red-700">Air quality data unavailable.</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold my-6">Nearby Places</h2>
<LiveMap lat={lat} lng={lng} googleKey={googleKey} />

      <div id="map" className="w-full h-[500px] border rounded shadow" />
      {/* <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places&callback=initMap`}></script> */}
    </div>
  );
};

export default LiveDashboard;
