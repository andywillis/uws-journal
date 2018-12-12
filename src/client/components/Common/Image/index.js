import React, { createElement, Component } from 'react';
import compileClasses from 'classnames';

import { getDeviceDimensions } from '../../../lib/device';

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
    this.setNode = this.setNode.bind(this);
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

  setNode(node) {
    this.node = node;
  }

  getNewWidth() {
    return Number(window.getComputedStyle(this.node).width.replace('px', ''));
  }

  handleLoad() {
    this.setState(({ isLoaded }) => {
      return { isLoaded: !isLoaded };
    });
  }

  render() {

    const { isLoaded } = this.state;
    const { alt, src: url, stretch } = this.props;

    const [ , altText, width, height ] = splitAltString(alt);
    const { deviceWidth } = getDeviceDimensions();

    const src = getResponsiveSrc(deviceWidth, url);
    const className = compileClasses(style.image, isLoaded && style.show);

    const aspectRatio = getRatio(width, height);

    const containerHeight = isLoaded && this.node
      ? this.getNewWidth() / aspectRatio
      : height;

    return (
      <div
        className={style.imageContainer}
        style={{ width: stretch, height: `${containerHeight}px` }}
        ref={this.setNode}
      >
        {this.getImageElement({ className, width, height, altText, src })}
      </div>
    );

  }

}


export default Image;
