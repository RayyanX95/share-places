import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer'
import './MainNavigation.css';
import Backdrop from './../UIElements/Backdrop';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  }

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      {drawerIsOpen && <SideDrawer>
        <nav className="main-navigation__drawer-nav" >
          <NavLinks></NavLinks>
        </nav>
      </SideDrawer>}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawer} >
          <span />
          <span />
          <span />
        </button>
        <h2 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h2>
        <nav className="main-navigation__header-nav" >
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
