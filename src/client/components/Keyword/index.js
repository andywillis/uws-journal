import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';


function Keyword({ keyword }) {
  return <span className={style.keyword}>{keyword}</span>;
}


export default Keyword;

Keyword.propTypes = {
  keyword: PropTypes.string.isRequired
};
