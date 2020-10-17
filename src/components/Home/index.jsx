import { UserContext } from '@providers/User';
import React, { useContext } from 'react';
import WeatherGroup from '@components/common/WeatherGroup';

// TODO: move to a separate function or actions
const sortByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
};

const Home = () => {
  const [{ defaultCities, favoriteCities, isFetchingWeatherReport }] = useContext(UserContext);

  if (isFetchingWeatherReport) {
    return (
      <div className="text-center">Initializing App...</div>
    );
  }

  return (
    <>
      <div>
        <h2 className="mb-1">Favorite Cities</h2>
        {
          favoriteCities.length > 0
            ? (
              <WeatherGroup reports={favoriteCities.sort(sortByName)} />
            )
            : (<div className="text-center" data-testid="no-favorite-cities">There are no Favorite Cities.</div>)
        }
      </div>
      <div className="mt-3">
        <h2 className="mb-1">Default Cities</h2>
        {
          defaultCities.length > 0
            ? (
              <WeatherGroup reports={defaultCities.sort(sortByName)} />
            )
            : (<div className="text-center" data-testid="no-default-cities">There are no Default Cities.</div>)
        }
      </div>
    </>
  );
};

export default Home;
