// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import style from './style.css';

/**
 * @function Para
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Para = ({ html }) => {
  return (
    <div
      className={style.para}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Para;

// Function proptypes
Para.propTypes = {
  html: PropTypes.string.isRequired
};
