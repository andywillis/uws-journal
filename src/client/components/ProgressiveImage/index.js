// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDimensions } from '../../lib/device';

// Style
import style from './style.css';


class ProgressiveImage extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoaded: false, fadeIn: true };
    this.getImageSrc = this.getImageSrc.bind(this);
    this.handleLoaded = this.handleLoaded.bind(this);
  }

  getImageSrc(x, type) {
    const { src } = this.props;
    const [ root, ext ] = src.split(/(\.jpg)/);
    if (type === 'placeholder') return `${root}_m${ext}`;
    if (x > 1000) return `${root}_c.jpg`;
    if (x < 380) return `${root}_n.jpg`;
    return `${src}.jpg`;
  }

  handleLoaded() {
    const { isLoaded } = this.state;
    this.setState({ isLoaded: !isLoaded, fadeIn: false });
  }

  render() {
    const { alt } = this.props;
    const { isLoaded, fadeIn } = this.state;
    const [ , txt, w, h ] = alt.match(/(.+) (\d+)x(\d+)/);
    const { x } = getDimensions();
    const aspectRatio = w / h;
    const height = 971 / aspectRatio;
    const imageClasses = classNames(style.imageFadeIn, isLoaded && style.loaded);

    return (
      <div className={style.imageContainer}>
        <img
          width={x < 380 ? 380 : 971}
          height={height}
          className={style.placeholder}
          src={this.getImageSrc(x, 'placeholder')}
          alt={txt}
        />
        <img
          className={imageClasses}
          src={this.getImageSrc(x)}
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
