import { UserContext } from '@providers/User';
import React, { useContext } from 'react';
import WeatherGroup from '@components/common/WeatherGroup';

const re = [
  {
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
    "id": 180147,
    "name": "Tokyo"
  },
  {
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
    "id": 150147,
    "name": "Tokyo"
  },
  {
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
    "id": 185014,
    "name": "Tokyo"
  },
  {
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
    "id": 18520147,
    "name": "Tokyo"
  },
  {
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
    "id": 18510147,
    "name": "Tokyo"
  },
  {
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
    "id": 18501347,
    "name": "Tokyo"
  },
  {
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
    "id": 18501447,
    "name": "Tokyo"
  },
  {
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
    "id": 18501447,
    "name": "Tokyo"
  },
  {
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
    "id": 18450147,
    "name": "Tokyo"
  },
  {
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
    "id": 18504147,
    "name": "Tokyo"
  },
  {
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
  },
  {
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
    "id": 18501474,
    "name": "Tokyo"
  },
  {
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
    "id": 18501427,
    "name": "Tokyo"
  },
  {
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
  },
  {
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
    "id": 18350147,
    "name": "Tokyo"
  },
]

const Home = () => {
  const [state] = useContext(UserContext);

  return (
    <div>
      Home
      <WeatherGroup reports={re} />
    </div>
  );
};

export default Home;
