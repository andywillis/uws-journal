import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';


function SubTitle({ txt }) {
  return <div className={style.subTitle}>{txt}</div>;
}


export default SubTitle;

SubTitle.propTypes = {
  txt: PropTypes.string.isRequired
};
