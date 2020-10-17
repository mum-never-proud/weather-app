import { Link } from 'react-router-dom';
import { UserContext } from '@providers/User';
import { fetchCurrentLocationWeather } from '@actions/user';
import { queryPlace } from '@services/weather';
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
  const [isSearchDisabled, setIsSearchDisabled] = useState(!window.navigator.onLine);

  useEffect(() => {
    if (!currentLocationReport) {
      fetchCurrentLocationWeather()(dispatch);
    }

    window.addEventListener('online', () => setIsSearchDisabled(false));
    window.addEventListener('offline', () => setIsSearchDisabled(true));

    searchRef.current.focus();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      const place = await queryPlace(searchTerm);

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
    <div className="header p-1" data-testid="header">
      Home
      <form className="d-flex align-items-center flex-col">
        <div className="search-place position-relative" data-testid="search-place">
          <input
            className="p-1 form-control"
            type="text"
            ref={searchRef}
            value={searchTerm}
            disabled={isSearchDisabled}
            placeholder="Search for Locations"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => window.setTimeout(() => setIsFocused(false), 250)}
          />
          {
            isFocused && searchResult.length > 0 && (
              <div className="header--search-result-wrapper position-absolute">
                <ul className="header--search-result list-style-none" data-testid="search-result">
                  {searchResult.map((result) => (
                    <li className="p-1" key={result.id}>
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
      <div className="header--geo-report mt-1 d-flex justify-content-center">
        {
          isFetchingGeoWeatherReport && <span data-testid="fetching-geo-weather">Fetching...</span>
        }
        {
          currentLocationReport && (
            <WeatherCard
              report={currentLocationReport}
              hideDelete
              hideFavorite
            />
          )
        }
        {
          geoWeatherError && <span className="font-weight-bold" data-testid="geo-weather-error">{geoWeatherError}</span>
        }
      </div>
    </div>
  );
};

export default Header;
