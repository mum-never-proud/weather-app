import { UserContext } from '@providers/User';
import React, { useContext } from 'react';
import WeatherGroup from '@components/common/WeatherGroup';

const Home = () => {
  const [{ default: defaultReports }] = useContext(UserContext);

  return (
    <div className="mt-1">
      <WeatherGroup reports={defaultReports} />
    </div>
  );
};

export default Home;
