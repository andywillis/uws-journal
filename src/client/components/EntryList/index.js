import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Entry from '../Entry';
import ArrowStrip from '../ArrowStrip';


class EntryList extends Component {

  static buildArrowStrip(entry, links, totalEntries) {
    return (
      <ArrowStrip
        entry={entry}
        links={links}
        totalEntries={totalEntries}
      />
    );
  }

  static buildEntry(entry, filter) {
    return (
      <Entry
        key={entry.id}
        id={entry.id}
        link={entry.link}
        viewType={filter.viewType}
        title={entry.title}
        date={entry.date}
        body={entry.body}
        tags={entry.tags}
      />
    );
  }

  static buildContainer(entry, links, totalEntries, filter) {
    const arrowStrip = EntryList.buildArrowStrip(entry, links, totalEntries);
    return (
      <React.Fragment>
        {arrowStrip}
        {EntryList.buildEntry(entry, filter)}
        {arrowStrip}
      </React.Fragment>
    );
  }

  buildEntryList() {

    const {
      entries, links, filter, totalEntries
    } = this.props;

    if (filter.viewType === 'entry') {
      return EntryList.buildContainer(entries[0], links, totalEntries, filter);
    }
    return (
      <div>
        {entries.map((entry) => {
          return EntryList.buildEntry(entry, filter);
        })}
      </div>
    );
  }

  render() {
    const entryList = this.buildEntryList();
    return <div>{entryList}</div>;
  }
}


export default EntryList;

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.any).isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.objectOf(PropTypes.string).isRequired,
  totalEntries: PropTypes.number.isRequired
};
