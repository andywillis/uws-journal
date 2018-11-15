// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Heading from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Heading
        level="h2"
        type="entry"
        text="Test heading"
      />
    </div>,
    div
  );
});
