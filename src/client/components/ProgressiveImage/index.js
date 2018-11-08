// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDeviceDimensions } from '../../lib/device';

// Style
import style from './style.css';

const { deviceWidth } = getDeviceDimensions();

class ProgressiveImage extends Component {

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false };
    this.getImageSrc = this.getImageSrc.bind(this);
    this.handleLoaded = this.handleLoaded.bind(this);
  }

  getImageSrc(deviceWidth) {
    const { src } = this.props;
    const [ root, ext ] = src.split(/(\.jpg)/);
    if (deviceWidth > 1000) return `${root}_c${ext}`;
    if (deviceWidth < 380) return `${root}_n${ext}`;
    return `${src}`;
  }

  static getImageDimensions(w, h) {
    const aspectRatio = w / h;
    const width = (deviceWidth / 100) * 71.2;
    const height = width / aspectRatio;
    return [ width, height ];
  }

  handleLoaded() {
    const { hasLoaded } = this.state;
    if (!hasLoaded) {
      this.setState({ hasLoaded: true });
    }
  }

  render() {
    const { alt } = this.props;
    const { hasLoaded } = this.state;
    const [ txt, w, h ] = alt.match(/(.+) (\d+)x(\d+)/).slice(1);
    const [ width, height ] = ProgressiveImage.getImageDimensions(w, h);
    const imageClasses = classNames(style.imageFadeIn, hasLoaded && style.loaded);

    return (
      <div className={style.imageContainer}>
        <img
          width={width}
          height={height}
          className={style.placeholder}
          alt={txt}
        />
        <img
          className={imageClasses}
          src={this.getImageSrc(deviceWidth)}
          alt={txt}
          onLoad={this.handleLoaded}
        />
      </div>
    );

  }

}

export default ProgressiveImage;

// Function proptypes
ProgressiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
