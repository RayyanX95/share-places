import React from 'react'
import { shallow } from 'enzyme';

import PlaceItem from './PlaceItem';
import { findByTestAttr } from '../../../test/testUtil';

const setup = () => shallow(<PlaceItem />);

test('render place item', () => {

});

// test('render place item', () => {
//   const wrapper = setup({});
//   const placeItemLi = findByTestAttr(wrapper, 'place-item');

//   expect(placeItemLi.exists()).toBeTruthy();
// });

// describe('simulate and mock setShowMap', () => {
//   let wrapper;
//   const setState = jest.fn();
//   const useStateSpy = jest.spyOn(React, 'useState')
//   useStateSpy.mockImplementation((init) => [init, setState]);

//   beforeEach(() => {
//     wrapper = setup();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('[useState] showMap is true', () => {
//     const openModalBtn = findByTestAttr(wrapper, 'open-modal-btn');
//     openModalBtn.props().onClick();

//     expect(setState).toHaveBeenCalledWith(true);
//   });
// });