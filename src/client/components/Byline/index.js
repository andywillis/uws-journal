import React from 'react';
import PropTypes from 'prop-types';

import Keyword from '../Keyword';

import style from './style.css';

function getByline(type, value) {
  if (value) {
    return (
      <div className={style.byline}>
        Arranged by {type}
        <Keyword keyword={value} />
      </div>
    );
  }
  return (
    <div className={style.byline}>
      Arranged by {type}
    </div>
  );

}


function Byline({ type, value }) {
  return getByline(type, value);
}


export default Byline;

Byline.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string
};
