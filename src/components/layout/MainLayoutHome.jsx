import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayoutHome = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayoutHome;
