import React from 'react';

import Heading from '../../Common/Heading';
import Favourite from '../../Favourite';

import style from './style.css';


function Header({ props }) {

  const { link, viewType, title, date, id } = props;
  const isLink = [ 'page', 'tag' ].includes(viewType);

  return (
    <div className={style.header}>
      <Heading link={isLink && link} level="h2">{title}</Heading>
      <div className={style.inline}>
        <Heading level="h3" color="black">{date}</Heading>
        <Favourite id={id} status="inactive" />
      </div>
    </div>
  );
}


export default Header;
