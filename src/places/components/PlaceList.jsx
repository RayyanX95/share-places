import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

const PlaceList = (props) => {
  if (!props.items.length) {
    return (
      <Card>
        <h1>No places found. Maybe create one?</h1>
        <button>Share Place</button>
      </Card>
    )
  }
  return (
    <ul className='place-list' data-test="place-list-component" >
      {props.items.map(place => <PlaceItem
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

export default PlaceList
