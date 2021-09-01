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
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch (error) {

      };
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPLaces => prevPLaces.filter(place => place.id !== deletedPlaceId));
  }

  return (
    <React.Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
    </React.Fragment>
  )
}

export default UserPlaces
