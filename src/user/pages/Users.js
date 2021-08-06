import React, { useState, useEffect } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UserList';

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

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    try {
      setError(null);
      const sendRequest = async () => {
        const response = await fetch('http://localhost:5000/api/users');
        console.log('response', response);
        const parsedResponse = await response.json();
        console.log('parsedResponse', parsedResponse);
        if (!response.ok) {
          throw new Error(parsedResponse.message);
        }
        setLoadedUsers(parsedResponse.users);
        setIsLoading(false);
      };
      sendRequest();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    };
  }, []);

  const errorHandler = () => setError(null);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal asOverlay onClick={errorHandler} />}
      <UsersList items={loadedUsers || []} />
    </React.Fragment>
  )
}

export default Users
