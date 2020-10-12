import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { UserContext } from '@providers/User';
import { fetchCurrentWeather } from '@actions/user';
import { fetchCurrentWeatherByCoords } from '@services/weather';
import React, { useContext, useEffect } from 'react';
import Forecast from '@components/Forecast';
import Footer from '@common/Footer';
import Header from '@common/Header';
import Home from '@components/Home';
import cities from '@constants/cities.json';
import dbInstance from '@services/db';
import getUserLocation from '@services/location';
import '@styles';

const App = () => {
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    const updateMeta = async () => {
      const db = await dbInstance;
      const meta = db.table('meta');

      meta.update(meta.first() || {});
      db.commit(meta);
    };

    // getUserLocation()
    //   .then(({ coords }) => fetchCurrentWeatherByCoords(coords.latitude, coords.longitude));

    // fetchCurrentWeather(cities)(dispatch);

    updateMeta();
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/forecast/:place_id" component={Forecast} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
