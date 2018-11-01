// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Style
import style from './style.css';

/**
 * @function Arrow
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Arrow = (props) => {

  const { disabled, type, location } = props;

  return (
    <div
      className={disabled ? style.arrow : classnames(style.arrow, style.enabled)}
      type={type}
      data-location={location}
    />
  );
};

export default Arrow;

Arrow.defaultProps = {
  location: '',
  disabled: false
};

// Function proptypes
Arrow.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  location: PropTypes.string
};
