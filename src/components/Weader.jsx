import './Weader.css';
import { motion } from 'framer-motion';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import {useState , useRef } from 'react';
const allIcons = {
  '01d': clear_icon,
  '01n': clear_icon,
  '02d': cloud_icon,
  '02n': cloud_icon,
  '03d': cloud_icon,
  '03n': cloud_icon,
  '04d': drizzle_icon,
  '04n': drizzle_icon,
  '09d': rain_icon,
  '09n': rain_icon,
  '10d': rain_icon,
  '10n': rain_icon,
  '13d': snow_icon,
  '13n': snow_icon,
};
const Weader = () => {
  const [weather, setWeather] = useState(false);
  const [IsEmpty, setIsEmpty] = useState(true);
  const cityInput = useRef('');
  const search = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_APP_ID
    }`;

    if (city === '') {
      alert('enter city');
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          alert(`Enter Correct name of city !!`);
          return;
        }
        return res.json();
      })
      .then((data) => {
        const icon = allIcons[data.weather[0].icon];
        // console.log(data);
        
        setWeather({
          temp: data.main.temp,
          humidity: data.main.humidity,
          location: data.name,
          wundSpeed: data.wind.speed,
          icon,
        });
      })
      .catch((err) => {
        setWeather(false);
      });
  };

  const handelSearch = () => {
    
    const cty = cityInput.current.value;
    search(cty);
    // console.log(weather);

  };

  return (
    <motion.div
      className="weader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <motion.div
        className="serch-bar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}>
        <input placeholder="Search" ref={cityInput} />
        <motion.img
          src={search_icon}
          onClick={handelSearch}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      </motion.div>

      {weather ? (
        <>
          <motion.img
            src={weather.icon}
            className="weader-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p
            className="temp"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}>
            {weather.temp}° C
          </motion.p>
          <motion.p
            className="location"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}>
            {weather.location}
          </motion.p>

          <motion.div
            className="weader-data"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}>
            <motion.div
              className="col"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}>
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weather.humidity}%</p>
                <span>Humidity</span>
              </div>
            </motion.div>
            <motion.div
              className="col"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}>
              <img src={wind_icon} alt="" />
              <div>
                <p>{weather.wundSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </motion.div>
  );
};

export default Weader;
