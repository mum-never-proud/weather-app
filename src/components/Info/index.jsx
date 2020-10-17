import { useParams } from 'react-router-dom';
import { UserContext } from '@providers/User';
import { fetchCurrentWeatherById } from '@services/weather';
import React, { useContext, useEffect, useState } from 'react';
import WeatherCard from '@components/common/WeatherCard';

const Forecast = () => {
  const [{ defaultCities, favoriteCities, notes }] = useContext(UserContext);
  const [report, setReport] = useState();
  const { cityID } = useParams();

  useEffect(() => {
    const cachedReport = defaultCities.concat(favoriteCities).find((city) => +city.id === +cityID);

    if (cachedReport) {
      setReport(cachedReport);
    } else {
      const fetchReport = async () => {
        const rep = await fetchCurrentWeatherById(cityID);

        setReport(rep);
      };

      fetchReport();
    }
  }, [cityID]);

  return (
    <div>
      {
        report && (
        <WeatherCard
          report={report}
          hideActions
          showComments
          notes={notes.filter((note) => note.reportId === +cityID)}
        />
        )
      }
    </div>
  );
};

export default Forecast;
