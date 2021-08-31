import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';

import './PlaceItem.css';
import Button from './../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from './../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  }

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  }

  const confirmDeleteWarningHandler = async () => {
    cancelDeleteWarningHandler();
    console.log("DELETING");

    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        'DELETE',
        null, // no body needed
        {
          Authorization: `bearer ${auth.token}`
        }
      );
      props.onDelete(props.id);
    } catch (error) {

    };
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Modal
        data-test="map-modal"
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button data-test="close-modal-btn" onClick={closeMapHandler}>CLOSE</Button>}>
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal header="Alert!"
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarningHandler} >Cancel</Button>
            <Button danger onClick={confirmDeleteWarningHandler}>DELETE</Button>
          </React.Fragment>
        } >
        <p>Do you want to proceed and delete this place?</p>
      </Modal>
      <li className="place-item" data-test="place-item">
        <Card>
          <div className="place-item__image">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler} data-test="open-modal-btn" >VIEW ON MAP</Button>
            {auth.userId === props.creatorId &&
              <Button to={`/places/${props.id}`} >EDIT</Button>
            }
            {auth.userId === props.creatorId &&
              <Button danger onClick={showDeleteWarningHandler} >DELETE</Button>
            }
          </div>
        </Card>
      </li>
    </React.Fragment>
  )
}

export default PlaceItem
