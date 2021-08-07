import React, { useState, useEffect } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UserList';
import { useHttpClient } from './../../shared/hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    try {
      const sendHttpRequest = async () => {
        const parsedResponse = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(parsedResponse.users);
        // console.log('parsedResponse', parsedResponse);
      };
      sendHttpRequest();
    } catch (error) {
      // * Errors are handled on useHttpClient method
    };
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal asOverlay onClick={clearError} />}
      <UsersList items={loadedUsers || []} />
    </React.Fragment>
  )
}

export default Users
