// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Style
import style from './style.css';

/**
 * @function Tag
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Tag = ({ txt }) => {
  return (
    <Link to={{ pathname: `/tag/${txt}` }}>
      <li className={style.tag}>{txt}</li>
    </Link>
  );
};

export default Tag;

// Function proptypes
Tag.propTypes = {
  txt: PropTypes.string.isRequired
};
