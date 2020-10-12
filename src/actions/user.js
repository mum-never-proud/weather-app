import {
  fetchCurrentWeatherRequest, fetchCurrentWeatherSuccess, fetchCurrentWeatherFailure,
  fetchCurrentLocationWeatherRequest, fetchCurrentLocationWeatherSuccess,
  fetchCurrentLocationWeatherFailure,
  addToFavouritesRequest, addToFavouritesSuccess, addToFavouritesFailure,
} from '@action-creators/user';
import { fetchCurrentWeatherById, fetchCurrentWeatherByCoords } from '@services/weather';
import accessLocation from '@services/location';
import dbInstance from '@services/db';

export const fetchCurrentWeather = (places) => async (dispatch) => {
  dispatch(fetchCurrentWeatherRequest());

  try {
    const db = await dbInstance;
    const favorites = db.table('favorites').findAll();
    const favoritesIds = favorites.map((favorite) => favorite.cityId);
    const cityIds = places.map((place) => place.cityId).concat(favoritesIds);
    const res = await fetchCurrentWeatherById(cityIds);
    const reports = await res.json();

    if (reports.cod) {
      dispatch(fetchCurrentWeatherFailure([reports.message]));
    } else {
      const payload = { favorites: [], default: [] };

      console.log(favoritesIds);
      reports.list.forEach((report) => {
        if (favoritesIds.includes(report.id)) {
          payload.favorites.push(report);
        } else {
          payload.default.push(report);
        }
      });

      dispatch(fetchCurrentWeatherSuccess(payload));
    }
  } catch (ex) {
    dispatch(fetchCurrentWeatherFailure([ex.message]));
  }
};

export const fetchCurrentLocationWeather = () => async (dispatch) => {
  dispatch(fetchCurrentLocationWeatherRequest());

  try {
    const location = await accessLocation();
    const { coords } = location;
    const res = await fetchCurrentWeatherByCoords(coords.latitude, coords.longitude);
    const report = await res.json();

    dispatch(fetchCurrentLocationWeatherSuccess(report));
  } catch (ex) {
    dispatch(fetchCurrentLocationWeatherFailure(ex.message));
  }
};

export const addToFavourites = (payload) => async (dispatch) => {
  dispatch(addToFavouritesRequest());
  console.log(payload);


  try {
    const db = await dbInstance;
    const favorites = db.table('favorites');

    favorites.insert({ name: payload.name, cityId: payload.id, isFavorited: true });
    await db.commit(favorites);

    console.log(payload);

    dispatch(addToFavouritesSuccess(payload));
  } catch (ex) {
    console.log(ex);
    dispatch(addToFavouritesFailure(ex.message));
  }
};
