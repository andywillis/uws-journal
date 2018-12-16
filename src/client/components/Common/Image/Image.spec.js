import React from 'react';
import { shallow } from 'enzyme';

import Image from './index';

describe('Image component', () => {

  const img = (
    <Image
      src="https://farm5.staticflickr.com/4497/36861332483_823053a587.jpg"
      alt="Dungeness beach 800x449"
    />
  );

  const wrapper = shallow(img);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
