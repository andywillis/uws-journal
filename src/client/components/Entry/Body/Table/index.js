// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import style from './style.css';

/**
 * @function Table
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Table = ({ html }) => {
  return (
    <div className={style.table}>
      <table dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Table;

// Function proptypes
Table.propTypes = {
  html: PropTypes.string.isRequired
};
