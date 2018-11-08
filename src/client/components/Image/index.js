// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { getDeviceDimensions } from '../../lib/device';

// Style
import style from './style.css';

const getResponsiveSrc = (x, src) => {
  src = src.replace('.jpg', '');
  if (x > 1000) return `${src}_c.jpg`;
  if (x < 380) return `${src}_n.jpg`;
  return `${src}.jpg`;
};

/**
 * @function Image
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Image = ({ src, alt }) => {
  const { deviceWidth } = getDeviceDimensions();
  return (
    <img className={style.image} src={getResponsiveSrc(deviceWidth, src)} alt={alt} />
  );
};

export default Image;

// Function proptypes
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
