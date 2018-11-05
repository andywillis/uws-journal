// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Tags from '../Tags';

const EntryFooter = ({ tags }) => {
  return <Tags tags={tags} />;
};

export default EntryFooter;

EntryFooter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};
