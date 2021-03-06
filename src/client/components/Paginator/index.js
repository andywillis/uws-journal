import React from 'react';

import PageNumber from '../PageNumber';

import style from './style.css';


function getNumbers(props) {
  const { totalEntries, pageLimit, pageNumber } = props;
  const lower = Math.floor(totalEntries / pageLimit);
  const mod = totalEntries % pageLimit;
  const pageTotal = mod === 0 ? Math.round(lower) : Math.round(lower + 1);
  const arr = [];
  for (let i = 1, l = pageTotal; i <= l; i++) {
    arr.push(
      <PageNumber
        status={i === pageNumber ? 'active' : 'inactive'}
        key={i}
        number={i}
      />
    );
  }
  return arr;
}


function Paginator(props) {
  return (
    <nav className={style.paginator}>
      {getNumbers(props)}
    </nav>
  );
}


export default Paginator;
