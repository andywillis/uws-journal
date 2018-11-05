// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// React
import Title from '../Title';
import SubTitle from '../Subtitle';
import EntryBody from '../EntryBody';

/**
 * @function NotFound
 * @return {jsx} Component
 */
const NotFound = () => {
  return (
    <div>
      <Title txt="404" />
      <SubTitle txt="Page not found" />
      <Link to="/">
        <EntryBody body={[{ id: 0, type: 'para', html: 'Return to home page' }]} />
      </Link>
    </div>
  );
};

export default NotFound;
