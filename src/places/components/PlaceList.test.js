import React from 'react'
import { shallow } from 'enzyme';

import PlaceList from './PlaceList';
import { findByTestAttr } from '../../../test/testUtil';
import { DUMMY_PLACES } from '../pages/UserPlaces';


const setup = (props) => shallow(<PlaceList {...props} />);

describe("render PLaceList component", () => {
  test('render if places list there are pLaces', () => {
    const wrapper = setup({ items: DUMMY_PLACES });
    const placeList = findByTestAttr(wrapper, 'place-list-component');

    expect(placeList.length).toBe(1);
  });

  test('render "no places" message if there are no places', () => {
    const wrapper = setup({ items: [] });
    const noPlacesMessage = findByTestAttr(wrapper, 'no-places-message');

    expect(noPlacesMessage.exists()).toBe(true);
  });
});

describe('render place item', () => {
  test('no place item found', () => {
    const wrapper = setup({items: []});
    const placeItem = findByTestAttr(wrapper, 'place-item');

    expect(placeItem.length).toBe(0)
  });

  test('render place item list when they are 3', () => {
    const wrapper = setup({items: DUMMY_PLACES});
    const placeItem = findByTestAttr(wrapper, 'place-item');

    expect(placeItem.length).toBe(3)
  })
})