import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';


function Blockquote({ html }) {
  return (
    <div
      className={style.blockquote}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


export default Blockquote;

Blockquote.propTypes = {
  html: PropTypes.string.isRequired
};
