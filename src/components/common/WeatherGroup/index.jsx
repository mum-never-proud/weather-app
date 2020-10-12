import React from 'react';
import PropTypes from 'prop-types';
import WeatherCard from '@components/common/WeatherCard';
import './style.scss';

const WeatherGroup = ({ reports, isFavorite }) => (
  <div className="weather-group">
    {reports.map((report) => (
      <WeatherCard key={report.id} report={report} isFavorite={isFavorite} />
    ))}
  </div>
);

WeatherGroup.defaultProps = {
  isFavorite: false,
};
WeatherGroup.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFavorite: PropTypes.bool,
};

export default WeatherGroup;
