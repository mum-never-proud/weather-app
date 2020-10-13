import { useParams } from 'react-router-dom';
import { UserContext } from '@providers/User';
import React, { useContext, useEffect, useState } from 'react';
import WeatherCard from '@components/common/WeatherCard';

const Forecast = () => {
  const [{ defaultCities, favoriteCities }] = useContext(UserContext);
  const [report, setReport] = useState();
  const { cityID } = useParams();

  useEffect(() => {
    setReport(defaultCities.concat(favoriteCities).find((city) => +city.id === +cityID));
  }, []);

  return (
    <div>
      {
        report && <WeatherCard report={report} hideActions showComments />
      }
    </div>
  );
};

export default Forecast;
