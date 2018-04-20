const React = require('react');
const Beer = require('./Beer.jsx');

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

module.exports = BeerList;