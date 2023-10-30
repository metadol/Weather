import React, { useState, useEffect } from 'react';
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { BiWind } from 'react-icons/bi'
import { BsSunrise, BsSunset } from 'react-icons/bs'


const API_KEY = '455ef00526a569939fa10d2b03c760c9'; 

function WeatherApp() {
  const [location, setLocation] = useState(''); 
  const [weatherData, setWeatherData] = useState(null);


  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
      );
  
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data', error);
      setWeatherData(null);
    }
  };
  
  const convertTimestampToTime = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }
    return '';
  }

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  return (
    <div className=' gap-4 flex flex-col mt-20 md:mt-40 items-center'>
      <h1 className='text-lg font-bold '>Weather App</h1>

      <input
        className='p-2 w-[18.4rem] border-2  border-gray-600 outline-none'
        type="text"
        placeholder="Enter a location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {weatherData && (
        <div className='p-5 border-2 border-gray-500 shadow-l p-4'>
          <p className='text-center font-semibold '>{weatherData.name}</p>
          <p className='text-center pb-2'> {weatherData.weather[0].description}</p>
          <div className=' grid grid-cols-2 gap-3'>
            <div className='border-2 border-gray-500 p-5  flex flex-col justify-center items-center gap-2'>
              <TiWeatherPartlySunny size={23} />
              <span className='font-bold'>{weatherData.main.temp}°C</span>
              <p  className='text-gray-500 text-sm'>Temperature</p>
            </div>
            <div className='border-2 border-gray-500 p-5  flex flex-col justify-center items-center gap-2'>
              <BiWind size={23} />
              <span className='font-bold'>{weatherData.wind.speed}km/h</span>
              <p className='text-gray-500 text-sm'>Wind</p>
            </div>
            <div className='border-2 border-gray-500 p-5  flex flex-col justify-center items-center gap-2'>
              <BsSunrise size={23} />
              <span className='font-bold'>{convertTimestampToTime(weatherData.sys.sunrise)}</span>
              <p className='text-gray-500 text-sm'>Sunrise</p>
            </div>
            <div className='border-2 border-gray-500 p-5 flex flex-col justify-center items-center gap-2'>
              <BsSunset size={23} />
              <span className='font-bold'> {convertTimestampToTime(weatherData.sys.sunset)}</span>
              <p className='text-gray-500 text-sm'>Sunset</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default WeatherApp;
