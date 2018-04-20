const React = require('react');
const WishList = require('./WishList.jsx');

const WishListList = (props) => (
  <div>
  <h1 id="title-wishlist">My Wishlist</h1>
    {props.wishList.map(beer => {
      return (
        <WishList
          beer={beer}
          user={props.user}
          addOrRemoveBeer={props.addOrRemoveBeer}
          handleClicks={props.handleClicks}
          key={beer.id}
        />
      )
    })}
  </div>
);

module.exports = WishListList;