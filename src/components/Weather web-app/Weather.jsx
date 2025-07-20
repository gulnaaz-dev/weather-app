import React, { useState } from "react";
import Search from "./Search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=556d12137eb0f27349e311fd073882fd`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      const convertedData = {
        ...data,
        main: {
          ...data.main,
          temp: kelvinToCelsius(data.main.temp),
          temp_max: kelvinToCelsius(data.main.temp_max),
          temp_min: kelvinToCelsius(data.main.temp_min)
        }
      };

      console.log("Converted weather data:", convertedData);
      setWeatherData(convertedData);
    } catch (e) {
      console.error("Error fetching weather data:", e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const handleSearch = async () => {
    if (search.trim()) {
      await fetchWeatherData(search);
    } else {
      console.log("Please enter a city name");
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  console.log("Loading:", loading);
  console.log("Weather Data:", weatherData);

  return (
    <div className="w-[100vw] h-[100vh] max-w-md mx-auto p-4 flex flex-col justify-center items-center">
      <div>
        <Search
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : weatherData ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                {weatherData.name}
                <span className="ml-2 text-sm text-gray-600 align-top">
                  {weatherData.sys?.country}
                </span>
              </h2>
            </div>
            <div className="text-center text-gray-600 mb-4">
              <span>{getCurrentDate()}</span>
            </div>
            <div className="text-5xl font-bold text-center text-blue-500 mb-4">
              {weatherData.main.temp}°C
            </div>
            <p className="text-center text-xl text-gray-700 mb-6">
              {weatherData.weather[0]?.description}
            </p>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-semibold text-blue-500">
                  {weatherData.wind?.speed} m/s
                </p>
                <p className="text-gray-600">Wind Speed</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-blue-500">
                  {weatherData.main.humidity}%
                </p>
                <p className="text-gray-600">Humidity</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;