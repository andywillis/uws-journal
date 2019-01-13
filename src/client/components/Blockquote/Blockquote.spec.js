import React from 'react';
import { shallow } from 'enzyme';

import Blockquote from './index';

describe('App component', () => {

  const wrapper = shallow(<Blockquote html="<div>Hi</div>"/>);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
