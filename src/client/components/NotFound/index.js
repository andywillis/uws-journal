import React from 'react';
import { Link } from 'react-router-dom';

import Heading from '../Common/Heading';
import Body from '../Entry/Body';

import style from './style.css';

function NotFound() {
  return (
    <section className={style.notFound}>
      <Heading level="h1" color="black">404</Heading>
      <Link to="/">
        <Body body={[{
          id: 0,
          type: 'para',
          html: '> return to the main page <'
        }]}
        />
      </Link>
    </section>
  );
}


export default NotFound;
