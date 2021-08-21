import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BiUser } from "react-icons/bi";

import './NavLinks.css';
import { AuthContext } from '../../context/auth-context';

const NanLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact >All Users</NavLink>
      </li>
      {auth.isLoggedIn && <li>
        <NavLink to={`/${auth.userId}/places`} >My Places</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <NavLink to="/places/new" >Add Place</NavLink>
      </li>}
      {!auth.isLoggedIn && <li>
        <NavLink to="/auth" >Authenticate</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <button onClick={auth.logout} >LOGOUT</button>
      </li>}
      {auth.isLoggedIn && <li title={auth.username} >
        <BiUser color="#f8df00" size="2rem" />
      </li>}

    </ul >
  )
}

export default NanLinks
