import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';


function Keyword({ keyword }) {
  return <li className={style.keyword}>{keyword}</li>;
}


export default Keyword;

Keyword.propTypes = {
  keyword: PropTypes.string.isRequired
};
