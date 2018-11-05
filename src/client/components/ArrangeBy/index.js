// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Keyword from '../Keyword';

// Style
import style from './style.css';

function getByline(type, value) {
  if (value) {
    return (
      <div className={style.arrangedByContainer}>
        <div className={style.arrangedBy}>
          Arranged by {type}
          <Keyword keyword={value} />
        </div>
      </div>
    );
  }
  return (
    <div className={style.arrangedByContainer}>
      <div className={style.arrangedBy}>
        Arranged by {type}
      </div>
    </div>
  );
}

/**
 * @function Byline
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Byline = ({ type, value }) => {
  return getByline(type, value);
};

export default Byline;

// Function proptypes
Byline.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string
};
