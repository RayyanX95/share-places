import React from 'react'
import { shallow } from 'enzyme';

import UserItem from './UserItem';
import { findByTestAttr } from '../../../test/testUtil';


const setup = (props = {}) => shallow(<UserItem {...props} />);

describe('render user', () => {
  let wrapper;
  const id = 'test';
  beforeEach(() => {
    wrapper = setup({ id: "test" });
  });
  test('render user item', () => {
    const userItem = findByTestAttr(wrapper, 'user-item');
    expect(userItem.exists()).toBeTruthy();
  });

  test('check user link', () => {
    const userLink = findByTestAttr(wrapper, 'user-link');
    expect(userLink.props().to).toBe(`/${id}/places`);
  });
});
