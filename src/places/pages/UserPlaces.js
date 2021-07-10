import React from 'react';
import PlaceList from '../components/PlaceList';



const UserPlaces = () => {
  const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'First Place',
      description: 'First place of Ibrahim AlRayyan house',
      imageUrl: 'https://bloximages.newyork1.vip.townnews.com/thedesertreview.com/content/tncms/assets/v3/editorial/f/fb/ffb5de7a-eff4-11e7-8c16-23a73bf85f92/5a4be0b0b2cae.image.jpg',
      address: 'New York, NY 10036, USA!',
      creatorId: 'u1',
      location: {
        lat: 40.7580013,
        lng: -73.9877574
      },
    },
    {
      id: 'p2',
      title: 'First Place',
      description: 'Second place of Ibrahim AlRayyan house',
      imageUrl: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-witness/d/d6/River_Obelisk.jpg',
      address: 'New York, NY 10036, USA!',
      creatorId: 'u1',
      location: {
        lat: 40.7580013,
        lng: -73.9877574
      }
    },
    {
      id: 'p2',
      title: 'First Place',
      description: 'Second place of Ibrahim AlRayyan house',
      imageUrl: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-witness/d/d6/River_Obelisk.jpg',
      address: 'New York, NY 10036, USA!',
      creatorId: 'u3',
      location: {
        lat: 40.7580013,
        lng: -73.9877574
      }
    }
  ]
  return (
    <PlaceList items={DUMMY_PLACES} />
  )
}

export default UserPlaces
