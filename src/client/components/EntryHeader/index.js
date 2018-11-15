// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Heading from '../Common/Heading';
import Date from '../Date';
import Favourite from '../Favourite';

// Style
import style from './style.css';

const Header = (props) => {

  const { link, type, title } = props;
  const { date, id } = props;

  return (
    <div className={style.header}>
      <Heading
        link={type === 'page' && link}
        level="h2"
        type={type}
      >{title}
      </Heading>
      <div className={style.inline}>
        <Date date={date} />
        <Favourite id={id} status="inactive" />
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
