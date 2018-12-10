import React from 'react';

import Icon from '../Icon';

import style from './style.css';


function IconStrip({ icons, handleIconClick }) {

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

}

export default IconStrip;
