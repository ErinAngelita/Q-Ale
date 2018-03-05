import React from 'react';
import { Link } from 'react-router-dom';
import Tomorrowland from '../css/Images/Tomorrowland.jpg';
import '../css/Header.css';

const Header = () => (
  <header>
    <div>
      <img id="main" src={Tomorrowland}/>
    </div>
    <nav>

    </nav>
  </header>
)

export default Header;
