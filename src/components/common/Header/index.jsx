import { Link } from 'react-router-dom';
import { UserContext } from '@providers/User';
import { fetchCurrentLocationWeather } from '@actions/user';
import { findPlace } from '@services/weather';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import WeatherCard from '@components/common/WeatherCard';
import './style.scss';

const Header = () => {
  const [{
    currentLocationReport, geoWeatherError, isFetchingGeoWeatherReport,
  }, dispatch] = useContext(UserContext);
  const searchRef = useRef();
  const timeout = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (!currentLocationReport) {
      fetchCurrentLocationWeather()(dispatch);
    }

    searchRef.current.focus();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      const res = await findPlace(searchTerm);
      const place = await res.json();

      setSearchResult(place.list);
    };

    clearTimeout(timeout.current);

    if (searchTerm.length > 3) {
      timeout.current = window.setTimeout(performSearch, 250);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

  return (
    <div className="header p-1">
      <form className="d-flex align-items-center flex-col">
        <div className="search-place position-relative">
          <input
            className="p-1 form-control"
            type="text"
            ref={searchRef}
            placeholder="Search for Locations"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => window.setTimeout(() => setIsFocused(false), 250)}
          />
          {
          isFocused && searchResult.length > 0 && (
            <div className="header--search-result-wrapper position-absolute">
              <ul className="header--search-result list-style-none">
                {searchResult.map((result) => (
                  <li className="p-15" key={result.id}>
                    <Link to={`/info/${result.id}`}>
                      {result.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
        </div>
      </form>
      <div className="header--geo-report mt-1">
        {
            isFetchingGeoWeatherReport && <span>Fetching...</span>
          }
        {
            currentLocationReport && <WeatherCard report={currentLocationReport} hideActions />
          }
        {
            geoWeatherError && <span className="font-weight-bold">{geoWeatherError}</span>
          }
      </div>
    </div>
  );
};

export default Header;
