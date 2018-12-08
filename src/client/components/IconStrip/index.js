// Dependencies
import React from 'react';

// React
import Icon from '../Icon';

// Style
import style from './style.css';

function processAnchor(type) {
  switch (type) {
    case 'mail': {
      const address = 'dev@awillis.fastmail.fm';
      const subject = 'Message from uws site';
      window.location.href = [
        'mailto:', address, '?', 'subject=', subject
      ].join('');
      break;
    }
    case 'flickr': {
      window.open('https://www.flickr.com/photos/urbanwhaleshark/');
      break;
    }
    case 'twitter': {
      window.open('https://twitter.com/urbanwhaleshark');
      break;
    }
    default:
      break;
  }
}

const locations = [
  { id: 0, type: 'mail', active: true },
  { id: 1, type: 'flickr', active: true },
  { id: 2, type: 'rss', active: false }
];

const IconStrip = () => {

  return (
    <div className={style.iconStrip}>
      {locations.map(({ id, type, active }) => {
        return (
          <Icon
            key={id}
            type={type}
            handleClick={() => processAnchor(type)}
            active={active}
          />
        );
      })}
    </div>
  );

};

export default IconStrip;
