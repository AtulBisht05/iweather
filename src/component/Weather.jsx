import React, { useState } from "react";
import "./Weather.css";
import search from "../assets/search.png";

// const API_KEY = process.env.W_API_KEY;
const API_KEY = import.meta.env.VITE_API_KEY


function Weather(props) {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    try {
      props.setProgress(30);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      props.setProgress(70);
      if (!res.ok) {
        throw new Error("City not found");
      } else {
        const data = await res.json();
        console.log(data);
        props.setProgress(100);
        setWeatherData(data);
        setError("");
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  return (
    <>
      <div className="container text-primary text-center border border-borderless">
        <h1>iWeather</h1>
      </div>
      <div className="container border border-borderless">
        <div className="input-group  my-3">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter the City"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
          <button
            type="button"
            onClick={fetchWeatherData}
            className="btn btn-primary"
          >
            Search City
          </button>
        </div>

       { error && <p className="text-danger">{error}</p>}

        {weatherData && (
          <>
            
            <div className="card text-center ">
            <div className="row ">
              <div className="col-sm-6 p-3 ">
                <img
                  style={{ height: "150px", width: "150px" }}
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  className="card-img-top bg-info rounded p-2"
                  alt="..."
                />
                <h2 className="card-title text-primary ">
                  {weatherData.weather[0].main}
                </h2>
              </div>
              <div className="col-sm-6 p-3">
                <div className="card-body text-center">
                  <h1 className="card-title text-primary py-5">
                    {weatherData.name}, {weatherData.sys.country}
                  </h1>
                  <h2 className="card-title text-primary">{`${Math.round(
                    weatherData.main.temp
                  )}°C`}</h2>
                </div>
              </div>
              </div>
            </div>
          
            <div className="row p-2 text-primary-emphasis bg-primary-subtle border border-borderless rounded-3">
              <div className="col-sm-6">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Max Temperature</h5>
                    <p className="card-text text-secondary">
                      <h4>{` ${Math.round(weatherData.main.temp_max)} °C `}</h4>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Min Temperature</h5>
                    <p className="card-text text-secondary">
                      <h4>{` ${Math.round(weatherData.main.temp_min)} °C `}</h4>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-2 text-primary-emphasis bg-primary-subtle border border-borderless rounded-3">
              <div className="col-sm-4 ">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Pressure </h5>
                    <p className="card-text text-secondary">
                      <h4>{` ${weatherData.main.pressure} hPa `}</h4>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Wind Speed</h5>
                    <p className="card-text text-secondary">
                      <h4>{` ${weatherData.wind.speed} km/h `}</h4>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Humidity</h5>
                    <p className="card-text text-secondary">
                      <h4>{` ${weatherData.main.humidity} % `}</h4>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Weather;
