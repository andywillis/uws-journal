import React from 'react';
import PropTypes from 'prop-types';
import compileClasses from 'classnames';

import style from './style.css';


function Arrow(props) {

  const { disabled, type, location } = props;

  const classNames = compileClasses({
    [style.arrow]: true,
    [style[type]]: true,
    [style.disabled]: disabled && true
  });

  return (
    <button
      className={classNames}
      type="button"
      data-location={location}
    />
  );

}


export default Arrow;

Arrow.defaultProps = {
  location: '',
  disabled: false
};

Arrow.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  location: PropTypes.string
};
