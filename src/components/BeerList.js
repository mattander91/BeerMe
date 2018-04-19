import React from 'react';
import Beer from './Beer';

const BeerList = (props) => (
  <div>
    {props.beers.map(beer => {
      return (
        <Beer
          beer={beer}
          addOrRemoveBeer={props.addOrRemoveBeer}
          key={beer.id}
          user={props.user}
        />
      )
    })}
  </div>
);

export default BeerList;