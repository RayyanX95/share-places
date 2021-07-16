import React from 'react'
import Enzyme, { shallow } from 'enzyme';

import PlaceList from './PlaceList';
import { findByTestAttr } from '../../../test/testUtil';
import { DUMMY_PLACES } from '../pages/UserPlaces';

import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

// Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props) => shallow(<PlaceList {...props} />);

describe("render PLaceList component", () => {
  test('render PLaces List if there are', () => {
    const wrapper = setup({ items: DUMMY_PLACES });
    const placeList = findByTestAttr(wrapper, 'place-list-component');

    expect(placeList.length).toBe(1);
  });
});
