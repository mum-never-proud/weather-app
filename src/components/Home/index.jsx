import React, { useContext } from 'react';
import { UserContext } from '@providers/User';

const Home = () => {
  const [state] = useContext(UserContext);

  return (
    <div>
      Home
      {JSON.stringify(state)}
    </div>
  );
};

export default Home;
