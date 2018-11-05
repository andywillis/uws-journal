// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// React
import Icon from '../Icon';
import IconStrip from '../IconStrip';

// Style
import style from './style.css';

/**
 * @function Header
 * @return {jsx} Component
 */
const Header = () => {
  return (
    <div className={style.header}>
      <Link to={{ pathname: '/' }}>
        <Icon type="avatar" />
      </Link>
      <IconStrip type="header" />
    </div>
  );
};

export default Header;
