import { UserContext } from '@providers/User';
import { fetchCurrentLocationWeather } from '@actions/user';
import React, { useContext, useEffect, useRef } from 'react';
import WeatherCard from '@components/common/WeatherCard';
import './style.scss';

const Header = () => {
  const [{
    currentLocationReport, geoReportError, isFetchingGeoReport,
  }, dispatch] = useContext(UserContext);
  const searchRef = useRef();

  useEffect(() => {
    if (!currentLocationReport) {
      fetchCurrentLocationWeather()(dispatch);
    }

    searchRef.current.focus();
  }, []);

  return (
    <div className="header p-1">
      <form className="d-flex align-items-center flex-col">
        <input className="search-place p-1" type="text" ref={searchRef} placeholder="Search for Locations" />
        <div className="header--geo-report mt-1">
          {
            isFetchingGeoReport && <span>Fetching...</span>
          }
          {
            currentLocationReport && <WeatherCard report={currentLocationReport} />
          }
          {
            geoReportError && <span className="font-weight-bold">{geoReportError}</span>
          }
        </div>
      </form>
    </div>
  );
};

export default Header;
