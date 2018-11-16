// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Heading from '../Common/Heading';
import Favourite from '../Favourite';

// Style
import style from './style.css';

const EntryHeader = ({ props }) => {

  const { link, viewType, title } = props;
  const { date, id } = props;

  return (

    <div className={style.header}>

      <Heading
        link={[ 'page', 'tag' ].includes(viewType) && link}
        level="h2"
        type="Entry heading"
        viewType={viewType}
      >{title}
      </Heading>

      <div className={style.inline}>
        <Heading level="h3" color="black" type="date">{date}</Heading>
        <Favourite id={id} status="inactive" />
      </div>

    </div>
  );
};

export default EntryHeader;

EntryHeader.propTypes = {
  props: PropTypes.objectOf(PropTypes.string).isRequired
};
