import {
  fetchWeatherRequest, fetchWeatherSuccess, fetchWeatherFailure,
  fetchGeoWeatherRequest, fetchGeoWeatherSuccess, fetchGeoWeatherFailure,
  addToFavoritesRequest, addToFavoritesSuccess, addToFavoritesFailure,
  removeFromFavoritesRequest, removeFromFavoritesSuccess, removeFromFavoritesFailure,
  removeFromDefaultRequest, removeFromDefaultSuccess, removeFromDefaultFailure,
  addOrUpdateCommentRequest, addOrUpdateCommentSuccess, addOrUpdateCommentFailure,
  removeCommentRequest, removeCommentSuccess, removeCommentFailure,
} from '@action-creators/user';
import { fetchCurrentWeatherById, fetchCurrentWeatherByCoords } from '@services/weather';
import accessLocation from '@services/location';
import dbInstance from '@services/db';

export const fetchCurrentWeather = (places) => async (dispatch) => {
  dispatch(fetchWeatherRequest());

  try {
    const db = await dbInstance;
    const favoriteCities = db.table('favourite_cities').findAll();
    const favoriteCitiesIds = favoriteCities.map((favorite) => favorite.cityId);
    const cityIds = places.map((place) => place.cityId).concat(favoriteCitiesIds);

    if (!cityIds.length && !favoriteCities.length) {
      dispatch(fetchWeatherSuccess(places));
      return;
    }

    const reports = await fetchCurrentWeatherById(cityIds);

    if (reports.cod) {
      dispatch(fetchWeatherFailure([reports.message]));
    } else {
      const payload = { favoriteCities: [], defaultCities: [], notes: db.table('notes').sort().findAll() };

      reports.list.forEach((report) => {
        if (favoriteCitiesIds.includes(report.id)) {
          payload.favoriteCities.push({ ...report, isFavorite: true });
        } else {
          payload.defaultCities.push({ ...report, isDefault: true });
        }
      });

      dispatch(fetchWeatherSuccess(payload));
    }
  } catch (ex) {
    dispatch(fetchWeatherFailure([ex.message]));
  }
};

export const fetchCurrentLocationWeather = () => async (dispatch) => {
  dispatch(fetchGeoWeatherRequest());

  try {
    const location = await accessLocation();
    const { coords } = location;
    const report = await fetchCurrentWeatherByCoords(coords.latitude, coords.longitude);

    dispatch(fetchGeoWeatherSuccess(report));
  } catch (ex) {
    dispatch(fetchGeoWeatherFailure([ex.message]));
  }
};

export const addToFavorites = (payload) => async (dispatch) => {
  dispatch(addToFavoritesRequest());

  try {
    const db = await dbInstance;
    const defaultCities = db.table('default_cities');
    const favoriteCities = db.table('favourite_cities');

    defaultCities.deleteBy({ cityId: payload.id });
    favoriteCities.insert({ name: payload.name, cityId: payload.id });

    await db.commit(favoriteCities);
    await db.commit(defaultCities);

    dispatch(addToFavoritesSuccess(payload));
  } catch (ex) {
    dispatch(addToFavoritesFailure(ex.message));
  }
};

export const removeFromFavorites = (payload) => async (dispatch) => {
  dispatch(removeFromFavoritesRequest());

  try {
    const db = await dbInstance;
    const favoriteCities = db.table('favourite_cities');

    favoriteCities.deleteBy({ cityId: payload.id });

    await db.commit(favoriteCities);

    dispatch(removeFromFavoritesSuccess(payload.id));
  } catch (ex) {
    dispatch(removeFromFavoritesFailure(ex.message));
  }
};

export const removeFromDefault = (payload) => async (dispatch) => {
  dispatch(removeFromDefaultRequest());

  try {
    const db = await dbInstance;
    const defaultCities = db.table('default_cities');

    defaultCities.deleteBy({ cityId: payload.id });

    await db.commit(defaultCities);

    dispatch(removeFromDefaultSuccess(payload.id));
  } catch (ex) {
    dispatch(removeFromDefaultFailure(ex.message));
  }
};

export const addComment = (payload) => async (dispatch) => {
  dispatch(addOrUpdateCommentRequest());

  try {
    const db = await dbInstance;
    const notes = db.table('notes');

    notes.insert({ ...payload.comment, reportId: payload.id });

    await db.commit(notes);

    dispatch(addOrUpdateCommentSuccess(notes.sort().findAll()));
  } catch (ex) {
    dispatch(addOrUpdateCommentFailure([ex.message]));
  }
};

export const removeComment = (payload) => async (dispatch) => {
  dispatch(removeCommentRequest());

  try {
    const db = await dbInstance;
    const notes = db.table('notes');

    notes.deleteBy({ id: payload.comment.id });

    await db.commit(notes);

    dispatch(removeCommentSuccess(notes.findAll()));
  } catch (ex) {
    dispatch(removeCommentFailure([ex.message]));
  }
};
