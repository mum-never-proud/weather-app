import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import userReduer, { userState } from '@reducers/user';

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReduer, userState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
};

export { UserContext };
export default UserProvider;
