import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';
import Button from './../../shared/components/FormElements/Button';

const PlaceList = (props) => {
  if (!props.items.length) {
    return (
      <Card>
        <h1 data-test='no-places-message' >No places found. Maybe create one?</h1>
        <Button to="/places/new" >Share PLace</Button>
      </Card>
    )
  }
  return (
    <ul className='place-list' data-test="place-list-component" >
      {props.items.map(place => <PlaceItem
        data-test="place-item"
        key={place.id}
        id={place.id}
        image={place.imageUrl}
        title={place.title}
        address={place.address}
        creatorId={place.creator}
        coordinates={place.location}
      />)}
    </ul>
  )
}

export default PlaceList;
