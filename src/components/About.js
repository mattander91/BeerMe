import React from 'react';

const About = () => (
  <div>
    <h1 id='title-about'>About</h1>
    <div className='about'>
      <p style={{'fontSize': '25px'}}>Beer Me</p>
      <p>Beer Me allows you keep track of beers you have tried and wishlist of beers you can only dream about trying. Beer Me is powered by <a style={{'color': 'white', 'textDecoration': 'underline'}} href='http://www.brewerydb.com/' target='_blank' rel='noopener noreferrer'>Brewery DB</a> which contains an extensive database of beer and brewery related info for almost any beer you can think of.
      </p>
      <p style={{'fontSize': '25px', 'margin-top': '50px'}}>How to use</p>
      <p>On the home page, simply search for a beer or brewery name and press enter or click the search button and a list of relevant beers will appear below the search bar. Click the '+' icon on the top right side of each result for a longer beer description, an image of the beer packaging, and buttons allowing you to add beers to your wishlist and to the list of beers you have tried.
      </p>
    </div>
  </div>
);

export default About;