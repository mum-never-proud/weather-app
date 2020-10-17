import React from 'react';
import PropTypes from 'prop-types';
import WeatherCard from '@components/common/WeatherCard';
import './style.scss';

const WeatherGroup = ({ reports }) => (
  <div className="weather-group">
    {
      reports.map((report) => (
        <WeatherCard key={report.id} report={report} />
      ))
    }
  </div>
);

WeatherGroup.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WeatherGroup;
