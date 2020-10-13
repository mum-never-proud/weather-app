import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { UserContext } from '@providers/User';
import { fetchCurrentWeather } from '@actions/user';
import React, { useContext, useEffect } from 'react';
import Info from '@components/Info';
import Header from '@common/Header';
import Home from '@components/Home';
import dbInstance from '@services/db';
import '@styles';

const App = () => {
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    const updateMeta = async () => {
      const db = await dbInstance;
      const meta = db.table('meta');
      const defaultCities = db.table('default_cities');

      // silently update storage in background

      if (!meta.size()) {
        const { default: cities } = await import('@constants/cities.json');

        defaultCities.insert(cities);
        db.commit(defaultCities);
      }

      meta.update(meta.first() || {});
      db.commit(meta);

      fetchCurrentWeather(defaultCities.findAll())(dispatch);
    };

    updateMeta();
  }, []);

  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/info/:cityID" component={Info} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
