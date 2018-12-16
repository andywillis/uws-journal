import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';


function Table({ html }) {
  return (
    <React.Fragment>
      <table className={style.table} dangerouslySetInnerHTML={{ __html: html }} />
    </React.Fragment>
  );
}


export default Table;

Table.propTypes = {
  html: PropTypes.string.isRequired
};
