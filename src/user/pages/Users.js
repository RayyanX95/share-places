import React, { useState, useEffect } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UserList';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    try {
      setError(null);
      const sendRequest = async () => {
        const response = await fetch('http://localhost:5000/api/users');
        const parsedResponse = await response.json();
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
