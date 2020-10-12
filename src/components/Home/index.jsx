import { UserContext } from '@providers/User';
import React, { useContext } from 'react';
import WeatherCard from '@components/common/WeatherCard';

const re = {
  "coord": {
    "lon": 139.69,
    "lat": 35.69
  },
  "sys": {
    "country": "JP",
    "timezone": 32400,
    "sunrise": 1602449094,
    "sunset": 1602490214
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "main": {
    "temp": 295.46,
    "feels_like": 296.91,
    "temp_min": 294.82,
    "temp_max": 296.15,
    "pressure": 1012,
    "humidity": 78
  },
  "visibility": 10000,
  "wind": {
    "speed": 2.1,
    "deg": 360
  },
  "clouds": {
    "all": 75
  },
  "dt": 1602465005,
  "id": 1850147,
  "name": "Tokyo"
};

const Home = () => {
  const [state] = useContext(UserContext);

  return (
    <div>
      Home
      <WeatherCard report={re} />
    </div>
  );
};

export default Home;
