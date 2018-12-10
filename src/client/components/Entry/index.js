import React from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import style from './style.css';


function Entry(props) {

  const { id, body, tags, ...headerProps } = props;

  return (
    <div className={style.entry} id={id}>
      <Header props={headerProps} />
      <Body body={body} />
      <Footer tags={tags} />
    </div>
  );

}


export default Entry;
