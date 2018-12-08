import React from 'react';
import classNames from 'classnames';

import style from './style.css';

/**
 * @function Icon
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Icon = ({ type, handleClick, active }) => {
  const className = classNames(style.icon, active && style.active);
  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      data-type={type}
    />
  );
};

export default Icon;
