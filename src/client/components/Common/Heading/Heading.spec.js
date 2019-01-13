import React from 'react';
import { shallow } from 'enzyme';

import Heading from './index';

describe('Heading component', () => {

  const wrapper = shallow(<Heading level="1">Heading</Heading>);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
