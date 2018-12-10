import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import style from './style.css';


function Footer({ isDisplayed }) {
  const footerClasses = classNames(style.footer, isDisplayed && style.visible);
  return (
    <div className={footerClasses}>
      &copy; Andy Willis 2018
    </div>
  );
}


function mapStateToProps({ journal }) {
  return {
    isDisplayed: journal.isDisplayed
  };
}

export default connect(mapStateToProps)(Footer);
