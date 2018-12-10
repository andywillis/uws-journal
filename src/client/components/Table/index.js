import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';


function Table({ html }) {
  return (
    <div className={style.table}>
      <table dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}


export default Table;

Table.propTypes = {
  html: PropTypes.string.isRequired
};
