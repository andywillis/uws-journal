import React from 'react';
import { shallow } from 'enzyme';

import App from './index';

describe('App component', () => {

  const wrapper = shallow(<App />);

  it('renders the component', () => {
    expect(wrapper.length).not(undefined);
  });

});
