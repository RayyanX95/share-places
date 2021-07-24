import React from 'react'
import { shallow } from 'enzyme';
import UserList from './UserList';
import { findByTestAttr } from './../../../test/testUtil';

const USERS = [
  {
    id: 'u1',
    name: 'Rayyan Ibrahim',
    image: 'https://miro.medium.com/max/2625/1*F7v0vO2QVlge4wjvcfA7Hg.jpeg',
    places: 3
  },
  {
    id: 'u2',
    name: 'Maxi German',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcuyBDRggXou5g5i6sKOl0AfJdj9fh8ff_9uYINW8xxS4lkgEwyRuvM3yydzi7DT-ylAg&usqp=CAU',
    places: 1
  },
  {
    id: 'u3',
    name: 'ZORRO',
    image: 'https://media.istockphoto.com/vectors/isometric-flat-vector-concept-of-mental-strength-vector-id1241352170?k=6&m=1241352170&s=170667a&w=0&h=YqeZk9O5zZdcFkQ_SdovOftrW3Up0qKDxlple3X5epg=',
    places: 3
  },
];

const setup = (props = {}) => shallow(<UserList {...props} />);

describe('render user list', () => {
  test('should show "No users" message when user list is empty', () => {
    const wrapper = setup({ items: [] });
    const noUsersMessage = findByTestAttr(wrapper, 'no-users');

    expect(noUsersMessage.exists()).toBeTruthy();
  });

  test('should show users list', () => {
    const wrapper = setup({ items: USERS });
    const userItem = findByTestAttr(wrapper, 'user-item');

    expect(userItem.length).toBe(USERS.length);
  })
});

