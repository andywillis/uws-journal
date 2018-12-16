import React from 'react';
import { shallow } from 'enzyme';

import Blockquote from './index';

describe('App component', () => {

  const wrapper = shallow(<Blockquote />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
