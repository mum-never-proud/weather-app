import { UserContext } from '@providers/User';
import { FiXCircle, FiCloud, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  addToFavourites, removeFromFavourites, removeFromDefault,
  addComment,
} from '@actions/user';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CommentForm from '@components/common/CommentForm';
import Note from '@components/common/Note';
import './style.scss';

const WeatherCard = ({
  report, showComments, notes, hideActions,
}) => {
  const {
    isFavorite, id, main, name, sys, weather,
  } = report;
  const [, dispatch] = useContext(UserContext);
  const commentSubmitHandler = (comment) => {
    addComment({ comment, id, isFavorite })(dispatch);
  };

  return (
    <div className="p-15 weather-card">
      <div className="text-right">
        {!hideActions && !isFavorite && (
          <FiXCircle
            size={24}
            onClick={() => removeFromDefault(report)(dispatch)}
          />
        )}
      </div>
      <div>
        <p className="weather-card--location">
          {name}
          ,
          {' '}
          {sys.country}
        </p>
        <p>
          <small>{weather[0].main}</small>
        </p>
      </div>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <FiCloud size={128} />
          <div>
            Humidity
            {' '}
            <span className="font-weight-bold">
              {main.humidity}
              %
            </span>
          </div>
        </div>
        <div className="weather-card--temp">
          {main.temp}
          <sup className="weather-card--unit">&deg;C</sup>
        </div>
      </div>
      {
        showComments && <CommentForm onSubmit={commentSubmitHandler} />
      }
      {
        notes.length > 0 && (notes.map((note) => (
          <div className="mt-1">
            <Note key={note.id} note={note} />
          </div>
        )))
      }
      {
        !hideActions && (
          <div className="mt-1 text-right">
            <FiHeart
              size={24}
              className={`${isFavorite ? 'text-danger' : ''}`}
              onClick={() => (isFavorite
                ? removeFromFavourites(report)(dispatch) : addToFavourites(report)(dispatch))}
            />
          </div>
        )
      }
      {
        !hideActions && (
          <div className="mt-1 text-center">
            <Link to={`/info/${id}`}>
              More Info
            </Link>
          </div>
        )
      }
    </div>
  );
};

WeatherCard.defaultProps = {
  showComments: false,
  hideActions: false,
  notes: [],
};
WeatherCard.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sys: PropTypes.shape({
      country: PropTypes.string.isRequired,
      sunrise: PropTypes.number.isRequired,
      sunset: PropTypes.number.isRequired,
    }),
    weather: PropTypes.arrayOf(PropTypes.object).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    isFavorite: PropTypes.bool,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.object),
  showComments: PropTypes.bool,
  hideActions: PropTypes.bool,
};

export default WeatherCard;
