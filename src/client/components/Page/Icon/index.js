// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import style from './style.css';

/**
 * @function Icon
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Icon = ({ type, clicked }) => {
  if (type === 'avatar') {
    return (
      <div
        role="Img"
        className={style.icon}
        type={type}
        onClick={clicked}
      />
    );
  }
  return (
    <div
      className={style.icon}
      type={type}
    />
  );
};

export default Icon;

// Function proptypes
Icon.propTypes = {
  type: PropTypes.string.isRequired,
  clicked: PropTypes.func
};
