// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import EntryHeader from '../EntryHeader';
import EntryBody from '../EntryBody';
import EntryFooter from '../EntryFooter';

// Style
import style from './style.css';

/**
 * @function Entry
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Entry = (props) => {

  const {
    id, body, tags, ...headerProps
  } = props;

  return (
    <div className={style.entry} id={id}>
      <EntryHeader props={headerProps} />
      <EntryBody body={body} />
      <EntryFooter tags={tags} />
    </div>
  );

};

export default Entry;

// Function proptypes
Entry.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};
