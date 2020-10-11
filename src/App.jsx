import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import React from 'react';
import Forecast from '@components/Forecast';
import Footer from '@common/Footer';
import Header from '@common/Header';
import Home from '@components/Home';
import UserProvider from '@providers/User';
import '@/App.css';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <UserProvider>
        <Route exact path="/" component={Home} />
      </UserProvider>
      <Route path="/forecast/:place_id" component={Forecast} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
    <Footer />
  </Router>
);

export default App;
