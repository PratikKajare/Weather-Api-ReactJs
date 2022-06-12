import React, { useState } from "react";
import axios from "axios";
import "./theme.css";
import Footer from "./Footer";
function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({
    description: "",
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: "",
  });
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const handleClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34780398117e661fddb821027073bd94`
      )
      .then((response) => {
        console.log(response);
        setData({
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
          name: response.data.name,
        });
      });
  };

  return (
    <>
      <div
        className={
          typeof data != "undefined"
            ? data.temp > 16
              ? "app warm"
              : "app"
            : "app"
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onKeyPress={handleClick}
            />
            <div className="location-box">
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
          </div>

          {data.temp === 0 ? (
            ""
          ) : (
            <>
              <div>
                <div className="location-box">
                  <div className="location">{data.description}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">{Math.round(data.temp - 273.15)}°c</div>
                </div>
              </div>
              <div className="name-box">
                <div className="weather-name">
                  {data.name} {data.country}
                </div>
              </div>
            </>
          )}
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
