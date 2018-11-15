// Dependencies
import React, { createElement } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Style
import style from './style.css';

function compileClasses(styles) {
  return classNames(styles);
}

function getLevel(classes, levelProps) {
  const { level, type, children } = levelProps;
  return createElement(level, { className: classes, type }, children);
}

function wrapLink(link, heading) {
  return (
    <Link to={{ pathname: `/entry/${link}` }}>{heading}</Link>
  );
}

function getHeading(classes, headingProps) {
  const { link, ...levelProps } = headingProps;
  const heading = getLevel(classes, levelProps);
  if (link) return wrapLink(link, heading);
  return heading;
}

const Heading = (props) => {

  const { color, ...headingProps } = props;

  const classes = compileClasses({
    [style.heading]: true,
    [style.default]: !color,
    [style.color]: color && true
  });

  return getHeading(classes, headingProps);

};

export default Heading;

Heading.propTypes = {
  color: PropTypes.string,
  link: PropTypes.string,
  level: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
