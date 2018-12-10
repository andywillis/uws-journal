import React from 'react';
import PropTypes from 'prop-types';

import Tags from '../Tags';


function EntryFooter({ tags }) {
  return <Tags tags={tags} />;
}


export default EntryFooter;

EntryFooter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};
