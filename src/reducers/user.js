import {
  FETCH_CURRENT_WEATHER_REQUEST, FETCH_CURRENT_WEATHER_SUCCESS, FETCH_CURRENT_WEATHER_FAILURE,
} from '@action-types';

export const userState = {
  isFetching: false,
  currentLocation: undefined,
  favorites: [],
  default: [],
  errors: [],
};

export default function weatherReducer(state = userState, action) {
  switch (action.type) {
    case FETCH_CURRENT_WEATHER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload,
      };
    case FETCH_CURRENT_WEATHER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}
