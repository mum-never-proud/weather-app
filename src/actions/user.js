import {
  fetchWeatherRequest, fetchWeatherSuccess, fetchWeatherFailure,
  fetchGeoWeatherRequest, fetchGeoWeatherSuccess, fetchGeoWeatherFailure,
  addToFavouritesRequest, addToFavouritesSuccess, addToFavouritesFailure,
  removeFromFavouritesRequest, removeFromFavouritesSuccess, removeFromFavouritesFailure,
  removeFromDefaultRequest, removeFromDefaultSuccess, removeFromDefaultFailure,
  addCommentRequest, addCommentSuccess, addCommentFailure,
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

    const res = await fetchCurrentWeatherById(cityIds);
    const reports = await res.json();

    if (reports.cod) {
      dispatch(fetchWeatherFailure([reports.message]));
    } else {
      const payload = { favoriteCities: [], defaultCities: [], notes: db.table('notes').findAll() };

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
    const res = await fetchCurrentWeatherByCoords(coords.latitude, coords.longitude);
    const report = await res.json();

    dispatch(fetchGeoWeatherSuccess(report));
  } catch (ex) {
    dispatch(fetchGeoWeatherFailure(ex.message));
  }
};

export const addToFavourites = (payload) => async (dispatch) => {
  dispatch(addToFavouritesRequest());

  try {
    const db = await dbInstance;
    const defaultCities = db.table('default_cities');
    const favoriteCities = db.table('favourite_cities');

    defaultCities.deleteBy({ cityId: payload.id });
    favoriteCities.insert({ name: payload.name, cityId: payload.id });

    await db.commit(favoriteCities);
    await db.commit(defaultCities);

    dispatch(addToFavouritesSuccess(payload));
  } catch (ex) {
    dispatch(addToFavouritesFailure(ex.message));
  }
};

export const removeFromFavourites = (payload) => async (dispatch) => {
  dispatch(removeFromFavouritesRequest());

  try {
    const db = await dbInstance;
    const favoriteCities = db.table('favourite_cities');

    favoriteCities.deleteBy({ cityId: payload.id });

    await db.commit(favoriteCities);

    dispatch(removeFromFavouritesSuccess(payload.id));
  } catch (ex) {
    dispatch(removeFromFavouritesFailure(ex.message));
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
  dispatch(addCommentRequest());

  try {
    const db = await dbInstance;
    const notes = db.table('notes');

    const note = notes.insert({ text: payload.comment, reportId: payload.id });

    await db.commit(notes);

    dispatch(addCommentSuccess(note));
  } catch (ex) {
    dispatch(addCommentFailure([ex.message]));
  }
};

export const removeComment = (payload) => async (dispatch) => {
  dispatch(removeCommentRequest());

  try {
    const db = await dbInstance;
    const defaultCities = db.table(payload.isFavorite ? 'favourite_cities' : 'default_cities');

    defaultCities.deleteBy({ cityId: payload.id });

    await db.commit(defaultCities);

    dispatch(removeCommentSuccess(payload.id));
  } catch (ex) {
    dispatch(removeCommentFailure(ex.message));
  }
};
