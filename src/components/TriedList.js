import React from 'react';
import Tried from './Tried';

const TriedList = (props) => (
  <div>
    <h1 id="title-tried">Your Beers</h1>
    {props.tried.map(beer => {
      return (
        <Tried
          beer={beer}
          user={props.user}
          removeBeer={props.removeBeer}
          handleHome={props.handleHome}
          key={beer.id}
          setUserInfo={props.setUserInfo}
        />
      )
    })}
  </div>
);

export default TriedList;