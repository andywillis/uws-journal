import React from 'react';
import { shallow } from 'enzyme';

import Byline from './index';

describe('App component', () => {

  const wrapper = shallow(<Byline />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
