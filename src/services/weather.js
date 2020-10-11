const { WEATHERSTACK_API_KEY, WEATHERSTACK_DOMAIN_NAME } = process.env;
const normalizePlaces = (places) => (Array.isArray(places) ? places.join(',') : places);

export const fetchCurrentWeather = (places) => fetch(`${WEATHERSTACK_DOMAIN_NAME}/current?access_key=${WEATHERSTACK_API_KEY}&query=${normalizePlaces(places)}`);

export const fetchWeatherForecast = (place, forecastDays = 1, hourly = 1) => fetch(`${WEATHERSTACK_DOMAIN_NAME}/current?access_key=${WEATHERSTACK_API_KEY}&query=${place}&forecast_days=${forecastDays}&hourly=${hourly}`);
