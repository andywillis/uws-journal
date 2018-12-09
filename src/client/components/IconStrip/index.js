// Dependencies
import React from 'react';

// React
import Icon from '../Icon';

// Style
import style from './style.css';

// const locations = [
//   { id: 0, type: 'mail', active: true },
//   { id: 1, type: 'flickr', active: true },
//   { id: 2, type: 'rss', active: false }
// ];

const IconStrip = ({ icons, handleIconClick }) => {

  return (
    <div className={style.iconStrip}>
      {icons.map(({ id, type, active, sticky }) => {
        return (
          <Icon
            key={id}
            type={type}
            handleIconClick={handleIconClick}
            active={active}
            sticky={sticky}
          />
        );
      })}
    </div>
  );

};

export default IconStrip;
