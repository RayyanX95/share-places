import React from 'react';

import './UserList.css'
import UserItem from './UserItem';

const UserList = props => {

  if (!props.items?.length) {
    return (
      <div data-test="no-users" className="center">
        <h2>No users found</h2>
      </div>
    )
  }
  return (
    <ul className="users-list" >
      {props.items.map(user => (
        <UserItem
          data-test="user-item"
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  )
}

export default UserList
