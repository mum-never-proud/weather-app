import { UserContext } from '@providers/User';
import { FiCloud, FiHeart } from 'react-icons/fi';
import { addToFavourites } from '@actions/user';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentForm from '@components/common/CommentForm';
import './style.scss';

const WeatherCard = ({ report, showComments }) => {
  const [, dispatch] = useContext(UserContext);
  const commentSubmitHandler = () => {};

  useEffect(() => {
    if (report.id === 1850147) {
      addToFavourites(report)(dispatch);
    }
  }, []);

  return (
    <div className="p-15 weather-card">
      <div>
        <p className="weather-card--location">
          {report.name}
          ,
          {' '}
          {report.sys.country}

          <FiHeart />
        </p>
        <p>
          <small>{report.weather[0].main}</small>
        </p>
      </div>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <FiCloud size={128} />
          <div>
            Humidity
            {' '}
            <span className="font-weight-bold">
              {report.main.humidity}
              %
            </span>
          </div>
        </div>
        <div className="weather-card--temp">
          {report.main.temp}
          <sup className="weather-card--unit">&deg;C</sup>
        </div>
      </div>
      {
        showComments && <CommentForm onSubmit={commentSubmitHandler} />
      }
    </div>
  );
};

WeatherCard.defaultProps = {
  showComments: false,
};
WeatherCard.propTypes = {
  report: PropTypes.shape({
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
  }).isRequired,
  showComments: PropTypes.bool,
};

export default WeatherCard;
