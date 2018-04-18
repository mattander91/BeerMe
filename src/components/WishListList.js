import React from 'react';
import WishList from './WishList';

const WishListList = (props) => (
  <div>
  <h1 id="title">My Wishlist</h1>
    {props.wishList.map(beer => {
      return (
        <WishList
          beer={beer}
          user={props.user}
          removeBeer={props.removeBeer}
          handleHome={props.handleHome}
          key={beer.id}
        />
      )
    })}
  </div>
);

export default WishListList;