// Dependencies
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Style
import style from './style.css';

/**
 * @function Tag
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Tag = (props) => {
  const { txt, cloud, count } = props;
  if (cloud) {
    return (
      <li className={style.tag}>
        <Link to={{ pathname: `/tag/${txt}` }}>
          <div className={classNames(style.text, style.pad)}>{txt}</div>
          <div className={classNames(style.count, style.pad)}>{count}</div>
        </Link>
      </li>
    );
  }
  return (
    <li className={classNames(style.tag, style.pad)}>
      <Link to={{ pathname: `/tag/${txt}` }}>
        {txt}
      </Link>
    </li>
  );
};

export default Tag;

// Function proptypes
Tag.propTypes = {
  txt: PropTypes.string.isRequired
};
