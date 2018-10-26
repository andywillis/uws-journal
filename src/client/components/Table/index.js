// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

// Style
import './style.css';

/**
 * @function Table
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Table = ({ html }) => {
  return (
    <div className="Table">
      <table>{renderHTML(html)}</table>
    </div>
  );
};

export default Table;

// Function proptypes
Table.propTypes = {
  html: PropTypes.string.isRequired
};

