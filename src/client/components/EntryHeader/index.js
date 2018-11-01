// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Title from '../Title';
import Date from '../Date';
import Favourite from '../Favourite';

// Style
import style from './style.css';

const EntryHeader = (props) => {

  const {
    link, type, title, date, id
  } = props;

  return (
    <div className={style.entryHeader}>
      <Title link={link} type={type}>{title}</Title>
      <div className={style.inline}>
        <Date date={date} />
        <Favourite id={id} status="inactive" />
      </div>
    </div>
  );
};

export default EntryHeader;

EntryHeader.propTypes = {
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
