// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import style from './style.css';


/**
 * @function Blockquote
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Blockquote = ({ html }) => {
  return (
    <div
      className={style.blockquote}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Blockquote;

// Function proptypes
Blockquote.propTypes = {
  html: PropTypes.string.isRequired
};
