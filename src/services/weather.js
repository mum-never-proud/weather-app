const { WEATHERSTACK_API_KEY, WEATHERSTACK_DOMAIN_NAME } = process.env;
const normalizePlaces = (places) => (Array.isArray(places) ? places.join(',') : places);

export const queryCurrentWeather = (place) => fetch(`${WEATHERSTACK_DOMAIN_NAME}/weather?q=${place}&appid=${WEATHERSTACK_API_KEY}&units=metric`);

export const fetchCurrentWeatherById = (ids) => fetch(`${WEATHERSTACK_DOMAIN_NAME}/${Array.isArray(ids) ? 'group' : 'weather'}?&id=${normalizePlaces(ids)}&appid=${WEATHERSTACK_API_KEY}&units=metric`);

export const fetchCurrentWeatherByCoords = (lat, lon) => fetch(`${WEATHERSTACK_DOMAIN_NAME}/weather?lat=${lat}&lon=${lon}&appid=${WEATHERSTACK_API_KEY}&units=metric`);

export const fetchWeatherForecast = (place, forecastDays = 1, hourly = 1) => fetch(`${WEATHERSTACK_DOMAIN_NAME}/current?appid=${WEATHERSTACK_API_KEY}&q=${place}&forecast_days=${forecastDays}&hourly=${hourly}&units=metric`);
