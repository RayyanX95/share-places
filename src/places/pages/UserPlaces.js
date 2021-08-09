import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from './../../shared/hooks/http-hook';
import ErrorModal from './../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/places/user/' + userId);
        setLoadedPlaces(responseData.places);
      } catch (error) {

      };
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      <PlaceList items={loadedPlaces} />
    </React.Fragment>
  )
}

export default UserPlaces
