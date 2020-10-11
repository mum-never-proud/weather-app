import {
  fetchCurrentWeatherRequest, fetchCurrentWeatherSuccess, fetchCurrentWeatherFailure,
} from '@action-creators/user';
import { fetchCurrentWeatherById } from '@services/weather';
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

      reports.list.forEach((report) => {
        if (cityIds.includes(report.id)) {
          payload.default.push(report);
        } else {
          payload.favorites.push(report);
        }
      });

      dispatch(fetchCurrentWeatherSuccess(payload));
    }
  } catch (ex) {
    dispatch(fetchCurrentWeatherFailure([ex.message]));
  }
};

export const fetchCurrentLocationWeather = (coords) => async (dispatch) => {};

export const updateFavorites = () => {};
