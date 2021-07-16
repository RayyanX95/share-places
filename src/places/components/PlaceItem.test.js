import React from 'react'
import { shallow } from 'enzyme';

import PlaceItem from './PlaceItem';
import { findByTestAttr } from '../../../test/testUtil';

const setup = () => shallow(<PlaceItem />);

test('render place item', () => {
  const wrapper = setup({});
  const placeItemLi = findByTestAttr(wrapper, 'place-item');

  expect(placeItemLi.exists()).toBeTruthy();
});

