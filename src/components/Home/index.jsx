import { UserContext } from '@providers/User';
import React, { useContext } from 'react';
import WeatherGroup from '@components/common/WeatherGroup';

const Home = () => {
  const [{ defaultCities, favoriteCities, isFetchingWeatherReport }] = useContext(UserContext);

  if (isFetchingWeatherReport) {
    return (
      <div className="text-center">Initializing App...</div>
    );
  }

  return (
    <>
      {
        favoriteCities.length > 0
          ? (
            <div className="mt-1">
              <div>Favorite Cities</div>
              <WeatherGroup reports={favoriteCities} />
            </div>
          )
          : (
            <div className="text-center" data-testid="no-favorite-cities">There are no Favorite Cities.</div>
          )
      }
      {
        defaultCities.length > 0
          ? (
            <div className="mt-1">
              <p>Default Cities</p>
              <WeatherGroup reports={defaultCities} />
            </div>
          )
          : (
            <div className="text-center" data-testid="no-default-cities">There are no Default Cities.</div>
          )
      }
    </>
  );
};

export default Home;
