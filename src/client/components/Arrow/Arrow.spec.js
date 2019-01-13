import React from 'react';
import { shallow } from 'enzyme';

import Arrow from './index';

describe('Arrow component', () => {

  const wrapper = shallow(<Arrow type="home"/>);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
