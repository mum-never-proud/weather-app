const { WEATHERSTACK_API_KEY, WEATHERSTACK_DOMAIN_NAME } = process.env;
const normalizePlaces = (places) => (Array.isArray(places) ? places.join(',') : places);
const fetchWeather = (url) => new Promise((resolve, reject) => {
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }

      throw Error(res);
    })
    .then(resolve)
    .catch((err) => reject(err.message || err));
});

export const fetchCurrentWeatherById = (ids) => fetchWeather(`${WEATHERSTACK_DOMAIN_NAME}/${Array.isArray(ids) ? 'group' : 'weather'}?&id=${normalizePlaces(ids)}&appid=${WEATHERSTACK_API_KEY}&units=metric`);

export const fetchCurrentWeatherByCoords = (lat, lon) => fetchWeather(`${WEATHERSTACK_DOMAIN_NAME}/weather?lat=${lat}&lon=${lon}&appid=${WEATHERSTACK_API_KEY}&units=metric`);

export const queryPlace = (place) => fetchWeather(`${WEATHERSTACK_DOMAIN_NAME}/find?q=${place}&appid=${WEATHERSTACK_API_KEY}&units=metric&type=like`);
