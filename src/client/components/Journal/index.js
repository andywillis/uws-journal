import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Byline from '../Byline';
import Paginator from '../Paginator';
import EntryList from '../EntryList';

import style from './style.css';

function createByline({ viewType, value }) {
  return (
    <Byline
      viewType={viewType !== 'page' ? viewType : 'date'}
      value={viewType !== 'page' ? value : ''}
    />
  );
}

function getPaginator(totalEntries, pageNumber, pageLimit) {
  if (totalEntries > pageLimit) {
    return (
      <Paginator
        totalEntries={totalEntries}
        pageNumber={pageNumber}
        pageLimit={pageLimit}
      />
    );
  }
}

function buildJournal(props) {

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

}


function Journal(props) {
  const { isDisplayed } = props;
  const journalClasses = classNames(style.journal, isDisplayed && style.visible);
  return (
    <main className={journalClasses}>
      {buildJournal(props)}
    </main>
  );
}


export default Journal;

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
