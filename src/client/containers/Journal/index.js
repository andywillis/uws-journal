import { connect } from 'react-redux';

import Journal from '../../components/Journal';

/**
 * @function filterData
 * @param  {array} entries    Entries
 * @param  {object} filter    Filter object
 * @param  {number} pageLimit  Page limit
 * @param  {number} pageNumber Page number
 * @return {array} Entries
 */
function filterData(entries, filter, pageLimit, pageNumber) {
  switch (filter.viewType) {
    case 'entry':
      return entries.filter((entry) => {
        return entry.link === filter.value;
      });
    case 'tag':
      return entries.filter((entry) => {
        return entry.tags.map((tag) => {
          return tag.txt;
        }).indexOf(filter.value) > -1;
      });
    case 'page':
    default: {
      const start = (pageNumber - 1) * pageLimit;
      const end = start + pageLimit;
      return entries.slice(start, end);
    }
  }
}

const mapStateToProps = (state, ownProps) => {

  const { entries, pageLimit, links, tags, isDisplayed } = state.journal;
  const { viewType, value } = ownProps.match.params;

  const pageNumber = viewType === 'page' ? Number(value) : 1;
  const filter = { viewType: viewType || 'page', value: value || 'date' };
  const filteredEntries = filterData(entries, filter, pageLimit, pageNumber);
  const totalEntries = entries.length;
  const totalFilteredEntries = filter.viewType === 'tag' ? filteredEntries.length : totalEntries;

  return {
    entries: filteredEntries,
    totalEntries: totalFilteredEntries,
    links,
    tags,
    pageLimit,
    filter,
    isDisplayed,
    pageNumber
  };
};

export default connect(mapStateToProps)(Journal);
