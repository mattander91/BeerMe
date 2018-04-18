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
          key={beer.id}
          setUserInfo={props.setUserInfo}
          handleClicks={props.handleClicks}
        />
      )
    })}
  </div>
);

export default TriedList;