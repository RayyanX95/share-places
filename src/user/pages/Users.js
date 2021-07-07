import React from 'react';

import UsersList from '../components/UserList';

const Users = () => {
  const USERS = [
    {
      id: 'ul1',
      name: 'Rayyan Ibrahim',
      image: 'https://miro.medium.com/max/2625/1*F7v0vO2QVlge4wjvcfA7Hg.jpeg',
      places: 3
    },
    {
      id: 'ul12',
      name: 'Ahmed Ibrahim',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcuyBDRggXou5g5i6sKOl0AfJdj9fh8ff_9uYINW8xxS4lkgEwyRuvM3yydzi7DT-ylAg&usqp=CAU',
      places: 1
    },
    {
      id: 'ul13',
      name: 'ZORRO',
      image: 'https://media.istockphoto.com/vectors/isometric-flat-vector-concept-of-mental-strength-vector-id1241352170?k=6&m=1241352170&s=170667a&w=0&h=YqeZk9O5zZdcFkQ_SdovOftrW3Up0qKDxlple3X5epg=',
      places: 3
    },
  ];

  return (
    <UsersList items={USERS} />
  )
}

export default Users
