import React, { useEffect, useRef } from 'react';
import './style.scss';

const Header = () => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="p-1 d-flex justify-content-center">
      <input className="search-place p-1" type="text" ref={searchRef} placeholder="Search for Locations" />
    </div>
  );
};

export default Header;
