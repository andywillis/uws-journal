import React from 'react';
import { Link } from 'react-router-dom';

import style from './style.css';

function getTitle({ type, link, children }) {
  if (type === 'entry') {
    return <div className={style.title} type={type}>{children}</div>;
  }
  return (
    <Link to={{ pathname: `/entry/${link}` }}>
      <div className={style.title} type="list">{children}</div>
    </Link>
  );
}


function Title(props) {
  return getTitle(props);
}


export default Title;
