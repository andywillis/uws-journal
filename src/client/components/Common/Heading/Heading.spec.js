import React from 'react';
import ReactDOM from 'react-dom';

import Heading from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Heading
        level="h2"
        type="entry"
        text="Test heading"
        color="black"
      />
    </div>,
    div
  );
});
