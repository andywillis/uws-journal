// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { getDimensions } from '../../lib/device';

// Style
import './style.css';

const getResponsiveSrc = (x, src) => {
  src = src.replace('.jpg', '');
  if (x > 1000) return `${src}_c.jpg`;
  if (x < 380) return `${src}_n.jpg`;
  return `${src}.jpg`;
}

/**
 * @function Image
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Image = ({ src, alt }) => {
  const { x } = getDimensions();
  return (
    <img className="Image" src={getResponsiveSrc(x, src)} alt={alt} />
  );
};

export default Image;

// Function proptypes
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
