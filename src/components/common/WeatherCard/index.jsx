import { UserContext } from '@providers/User';
import { FiXCircle, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  addToFavorites, removeFromFavorites, removeFromDefault,
  addComment, removeComment,
} from '@actions/user';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import NoteForm from '@components/common/NoteForm';
import Note from '@components/common/Note';
import WeatherIcons from '@constants/weather-icons';
import './style.scss';

const WeatherCard = ({
  report, showComments, notes, hideDelete, hideFavorite, hideNavigation,
}) => {
  const {
    isFavorite, id, main, name, sys, weather,
  } = report;
  const [{ isUpdateCommentSuccessful }, dispatch] = useContext(UserContext);
  const [currentNote, setCurrentNote] = useState({ text: '' });
  const commentSubmitHandler = (comment) => {
    addComment({ comment, id })(dispatch);
  };
  const commentEditHandler = (note) => setCurrentNote(note);
  const commentDeleteHandler = (comment) => removeComment({ comment })(dispatch);
  const WeatherIcon = WeatherIcons[weather[0].icon.slice(0, 2)];

  return (
    <div className="p-1 weather-card" data-testid="weather-card">
      <div className="text-right">
        {!hideDelete && !isFavorite && (
          <FiXCircle
            className="cursor-pointer"
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
          <WeatherIcon size={128} />
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
        showComments && (
        <NoteForm
          isSubmitted={isUpdateCommentSuccessful}
          onSubmit={commentSubmitHandler}
          note={currentNote}
        />
        )
      }
      {
        notes.length > 0 && (notes.map((note) => (
          <div className="mt-1" key={note.id}>
            <Note
              note={note}
              onEdit={commentEditHandler}
              onDelete={commentDeleteHandler}
            />
          </div>
        )))
      }
      {
        !hideFavorite && (
          <div className="mt-1 text-right">
            <FiHeart
              size={24}
              className={`cursor-pointer ${isFavorite ? 'text-danger' : ''}`}
              data-testid="favorite-icon"
              onClick={() => (isFavorite
                ? removeFromFavorites(report)(dispatch) : addToFavorites(report)(dispatch))}
            />
          </div>
        )
      }
      {
        !hideNavigation && (
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
  hideDelete: false,
  hideFavorite: false,
  hideNavigation: false,
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
      feels_like: PropTypes.number,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    isFavorite: PropTypes.bool,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.object),
  showComments: PropTypes.bool,
  hideDelete: PropTypes.bool,
  hideFavorite: PropTypes.bool,
  hideNavigation: PropTypes.bool,
};

export default WeatherCard;
