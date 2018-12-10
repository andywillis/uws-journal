import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';


function Para({ html }) {
  return (
    <div
      className={style.para}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


export default Para;

Para.propTypes = {
  html: PropTypes.string.isRequired
};
