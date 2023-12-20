import React, { useState } from 'react';
import './comp.css';
import searchIcon from './Assetes/SearchBar.png';
import cloudIcon from './Assetes/cloud.png';
import humidityIcon from './Assetes/Humidity.png';
import windIcon from './Assetes/WindSpeed.png';
import drizzelIcon from './Assetes/Drizzel.png';
import snowIcon from './Assetes/snow.png';
import rainIcon from './Assetes/Rain.png';
import sunnyIcon from './Assetes/clear.png';


const Comp = () => {
  const[weatherIcon, setWeatherIcon] = useState(cloudIcon);
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: '',
  });

  const ApiKey = '7660aa8e8904e28230fb94d315806c11';

  const search = async () => {
    try {
      const cityInput = document.getElementsByClassName('cityInput')[0];
      if (cityInput.value === '') {
        alert("Enter Your Location")
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${ApiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        humidity: data.main.humidity + " %",
        windSpeed: data.wind.speed + " km/h",
        temperature: data.main.temp + " °C",
        location: data.name,
      });

      console.log(data.weather[0].icon);
   
      if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
        setWeatherIcon(sunnyIcon);
      } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
        setWeatherIcon(cloudIcon);
      } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n' || data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
        setWeatherIcon(drizzelIcon);
      } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        setWeatherIcon(rainIcon);
      } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        setWeatherIcon(rainIcon);
      } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        setWeatherIcon(snowIcon);
      } else {
        setWeatherIcon(sunnyIcon);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="Search" />
          <div className="search-icon">
            <img
              src={searchIcon}
              alt="Error_Check_Your_Net_Connection"
              className="searchicon"
              onClick={() => search()}
            />
          </div>
        </div>
        <div className="left">
            <div id="year"></div>
            <div id="Month"></div>
            <div id="Day"></div>
            <div id="Days"></div>
        </div>
        <div className="center">
        <div className="weather-image">
          <img src={weatherIcon} alt="" />
        </div>
        <div className="weather-temp">{weatherData.temperature} </div>
        <div className="weather-location">{weatherData.location}</div>
        </div>
        <div className="right">
             <div id="Hour"></div>
            <div id="Min"></div>
            <div id="Sec"></div>
        </div>
        <div className="data-container">
          <div className="element">
            <img src={humidityIcon} className="icon" alt="" />
            <div className="data">
              <div className="humidity-percentege">{weatherData.humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={windIcon} className="icon" alt="" />
            <div className="data">
              <div className="wind-speed">{weatherData.windSpeed} </div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comp;
