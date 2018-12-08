// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

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
  const headerClasses = classNames(style.header, style.visible);
  return (
    <div className={headerClasses}>
      <Link to={{ pathname: '/' }}>
        <Icon type="avatar" active />
      </Link>
      <IconStrip type="header" />
    </div>
  );
};

export default Header;
