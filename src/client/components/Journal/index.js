// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// React
import Byline from '../Byline';
import Paginator from '../Paginator';
import EntryList from '../EntryList';

// Style
import style from './style.css';

const createByline = ({ viewType, value }) => {
  return (
    <Byline
      viewType={viewType !== 'page' ? viewType : 'date'}
      value={viewType !== 'page' ? value : ''}
    />
  );
};

const getPaginator = (totalEntries, pageNumber, pageLimit) => {
  if (totalEntries > pageLimit) {
    return (
      <Paginator
        totalEntries={totalEntries}
        pageNumber={pageNumber}
        pageLimit={pageLimit}
      />
    );
  }
};

const buildJournal = (props) => {

  const {
    entries,
    links,
    filter,
    totalEntries,
    pageLimit,
    pageNumber
  } = props;

  const isEntry = filter.viewType === 'entry';
  const isTag = filter.viewType === 'tag';

  return (
    <div>
      <div className={style.bylineContainer}>
        {isTag && createByline(filter)}
      </div>
      {!isEntry && getPaginator(totalEntries, pageNumber, pageLimit)}
      <EntryList
        entries={entries}
        links={links}
        filter={filter}
        totalEntries={totalEntries}
      />
      {!isEntry && getPaginator(totalEntries, pageNumber, pageLimit)}
    </div>
  );

};

/**
 * @function Journal
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Journal = (props) => {
  const { isDisplayed } = props;
  const journalClasses = classNames(style.journal, isDisplayed && style.visible);
  return (
    <div className={journalClasses}>
      {buildJournal(props)}
    </div>
  );
};

export default Journal;

// Function proptypes
createByline.propTypes = {
  viewType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

buildJournal.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.any).isRequired,
  links: PropTypes.arrayOf(PropTypes.any).isRequired,
  filter: PropTypes.string.isRequired,
  totalEntries: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired
};
