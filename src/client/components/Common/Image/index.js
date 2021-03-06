import React, { createElement, PureComponent } from 'react';
import compileClasses from 'classnames';

import style from './style.css';

function getSize(deviceWidth) {
  if (deviceWidth > 1000) return 'Large 1600';
  if (deviceWidth < 380) return 'Small 320';
  return 'Medium 640';
}

async function getResponsiveSrc(deviceWidth, src) {

  if (deviceWidth !== 0) {

    const flickrPhotoId = src.split('/').pop().split('_')[0];
    const size = getSize(deviceWidth);

    const settings = {
      path: 'https://api.flickr.com/services/rest/',
      method: 'method=flickr.photos.getSizes',
      apiKey: 'api_key=354bb01ada19773305e2e54736d7a829',
      photoId: `photo_id=${flickrPhotoId}`,
      format: 'format=json',
      callback: 'nojsoncallback=true'
    };

    const { path, method, apiKey, photoId, format, callback } = settings;

    try {
      const endpoint = `${path}?${method}&${apiKey}&${photoId}&${format}&${callback}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      return data.sizes.size.find(photo => photo.label === size).source;
    } catch (e) {
      console.log(e);
    }

  }

}

function splitAltString(alt) {
  const m = alt.match(/^(.+) (\d+)x(\d+) ?([a-zA-Z]+)?$/);
  return { altText: m[1], width: m[2], height: m[3], type: m[4] };
}

function getRatio(width, height) {
  return width / height;
}

class Image extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { isLoaded: false, src: 'none' };
    this.getImageElement = this.getImageElement.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate() {
    this.loadImage();
  }

  componentWillUnmount() {
    this.processing = false;
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

  async loadImage() {
    this.processing = true;
    const { deviceWidth, src: url, alt } = this.props;
    const { type } = splitAltString(alt);
    if (this.processing) {
      const src = type && type === 'single' ? url : await getResponsiveSrc(deviceWidth, url);
      this.processing = false;
      this.setState({ src });
    }
  }

  handleLoad() {
    this.setState(({ isLoaded }) => {
      return { isLoaded: !isLoaded };
    });
  }

  render() {

    const { isLoaded, src } = this.state;
    const { alt, deviceWidth } = this.props;
    const { altText, width, height } = splitAltString(alt);

    const className = compileClasses(style.image, isLoaded && style.show);
    const aspectRatio = getRatio(width, height);
    const stretch = (width < 800 ? 55 : 75);
    const correction = 10;

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
