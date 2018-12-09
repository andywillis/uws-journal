import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Icon from '../Icon';
import IconStrip from '../IconStrip';

import style from './style.css';

/**
 * @function Header
 * @return {jsx} Component
 */
const Header = ({ icons, handleIconClick }) => {
  const headerClasses = classNames(style.header, style.visible);
  return (
    <div className={headerClasses}>
      <Link to={{ pathname: '/' }}>
        <Icon type="avatar" active />
      </Link>
      <IconStrip
        icons={icons}
        handleIconClick={handleIconClick}
      />
    </div>
  );
};

export default Header;
