// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// Style
import style from './style.css';

/**
 * @function PageNumber
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const PageNumber = (props) => {

  const { status, number } = props;
  const pageNumberClasses = classNames(style.pageNumber, style[status]);

  return (
    <Link to={{ pathname: `/page/${number}` }}>
      <div
        className={pageNumberClasses}
        data-number={number}
      >
        {number}
      </div>
    </Link>
  );

};

export default PageNumber;

// Function proptypes
PageNumber.propTypes = {
  status: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};
