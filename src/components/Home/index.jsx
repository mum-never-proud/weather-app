import { UserContext } from '@providers/User';
import React, { useContext } from 'react';
import WeatherGroup from '@components/common/WeatherGroup';

const Home = () => {
  const [{ defaultCities, favoriteCities }] = useContext(UserContext);

  return (
    <div className="mt-1">
      {
        favoriteCities.length > 0 && (
          <div className="mt-1">
            <p>Favorite Cities</p>
            <WeatherGroup reports={favoriteCities} />
          </div>
        )
      }
      {
        defaultCities.length > 0 && (
          <div className="mt-1">
            <p>Default Cities</p>
            <WeatherGroup reports={defaultCities} />
          </div>
        )
      }
    </div>
  );
};

export default Home;
