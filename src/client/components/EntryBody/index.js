// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Subtitle from '../Subtitle';
import Para from '../Para';
import Blockquote from '../Blockquote';
import Image from '../Image';
import Table from '../Table';

/**
 * @function Paras
 * @param  {object} parts Component properties
 * @return {jsx} Component
 */
const EntryBody = ({ body }) => {
  return (
    <div className="EntryBody">
      {body.map((part) => {
        switch (part.type) {
          case 'image':
            return <Image key={part.id} src={part.src} alt={part.alt} />
          case 'blockquote':
            return <Blockquote key={part.id} html={part.html} />;
          case 'h2':
            return <Subtitle key={part.id} txt={part.txt} />;
          case 'table':
            return <Table key={part.id} html={part.html} />
          default:
            return <Para key={part.id} html={part.html} />;
        }
      })}
    </div>
  );
};

export default EntryBody;

// Function proptypes
EntryBody.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired
};
