import React from 'react';
import { shallow } from 'enzyme';

import Heading from './index';

describe('App component', () => {

  const wrapper = shallow(<Heading />);

  it('renders the component', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
