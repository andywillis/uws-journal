// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

// React
import Byline from '../Byline';
import Paginator from '../Paginator';
import EntryList from '../EntryList';

// Style
import style from './style.css';

const createByline = ({ type, value }) => {
  return (
    <Byline
      type={type !== 'page' ? type : 'date'}
      value={type !== 'page' ? value : ''}
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

  const isEntry = filter.type === 'entry';

  return (
    <div>
      <div className={style.bylineContainer}>
        {!isEntry && createByline(filter)}
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

const mapStateToProps = ({ journal }, props) => {
  return {
    ...props,
    isDisplayed: journal.isDisplayed
  };
};

export default connect(mapStateToProps)(Journal);

// Function proptypes
createByline.propTypes = {
  type: PropTypes.string.isRequired,
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
