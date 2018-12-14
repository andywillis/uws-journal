import React, { createElement, Component } from 'react';
import compileClasses from 'classnames';

import style from './style.css';

function getResponsiveSrc(x, src) {
  src = src.replace('.jpg', '');
  if (x > 1000) return `${src}_c.jpg`;
  if (x < 380) return `${src}_n.jpg`;
  return `${src}.jpg`;
}

function splitAltString(alt) {
  return alt.match(/^(.+) (\d+)x(\d+)$/);
}

function getRatio(width, height) {
  return width / height;
}

class Image extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
    this.getImageElement = this.getImageElement.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  getImageElement({ className, width, height, altText, src }) {
    return createElement('img', {
      className,
      width,
      height,
      alt: altText,
      onLoad: this.handleLoad,
      src
    });
  }

  handleLoad() {
    this.setState(({ isLoaded }) => {
      return { isLoaded: !isLoaded };
    });
  }

  render() {

    const { isLoaded } = this.state;
    const {
      alt,
      src: url,
      percentageStretch: stretch,
      percentageMarginCorrection: correction,
      deviceWidth
    } = this.props;

    const [ , altText, width, height ] = splitAltString(alt);
    const src = getResponsiveSrc(deviceWidth, url);
    const className = compileClasses(style.image, isLoaded && style.show);
    const aspectRatio = getRatio(width, height);
    const containerHeight = (deviceWidth * (stretch - correction)) / 100 / aspectRatio;
    const inlineStyle = { width: `${stretch}%`, height: `${containerHeight}px` };

    return (
      <div className={style.imageContainer} style={inlineStyle}>
        {this.getImageElement({ className, width, height, altText, src })}
      </div>
    );

  }

}


export default Image;
