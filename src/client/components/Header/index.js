import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Icon from '../Icon';
import IconStrip from '../IconStrip';

import style from './style.css';


function Header({ icons, handleIconClick }) {
  const headerClasses = classNames(style.header, style.visible);
  return (
    <header className={headerClasses}>
      <nav className={style.nav}>
        <Link to={{ pathname: '/' }}>
          <Icon type="home" active />
        </Link>
        <IconStrip
          icons={icons}
          handleIconClick={handleIconClick}
        />
      </nav>
    </header>
  );
}

export default Header;
