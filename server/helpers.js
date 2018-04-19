const request = require('request');
const config = require('../config.js');
const BreweryDb = require('brewerydb-node');
const brewdb = new BreweryDb(`${config.key}`);

let getBeerData = (search, callback) => {
  brewdb.search.beers({q: search, withBreweries: 'Y'}, (err, data) => {
    if (data) {
      let beerData = [];
      for (let i = 0; i < data.length; i++) {
        let icon = '';
        let brewIcon = '';
        data[i].labels ? icon = data[i].labels.medium : icon = 'img/beer-image.jpg';
        data[i].breweries[0].images ? brewIcon = data[i].breweries[0].images.medium : brewIcon = null;
        let relevance = addRelevance(search, data[i].name, data[i].breweries[0].name);
        if (relevance > 0) {
          beerData.push({
            name: data[i].name,
            id: data[i].id,
            description: data[i].description || data[i].style.description,
            icon: icon,
            abv: data[i].abv,
            brewer: data[i].breweries[0].name,
            brewerIcon: brewIcon,
            relevance: relevance
          });
        }
      }
      callback(beerData);
    } else if (err) {
      console.log('error getting data: ', err);
      callback([{noData: true}]);
    } else {
      callback([{noData: true}]);
    }
  });
}

let addRelevance = (search, beerName, brewer) => {
  let relevance = 0;
  let exp = /[a-zA-Z0-9\s]/g;
  let formattedSearch = search.match(exp).join('').toLowerCase().split(' ');
  let formattedBeer = beerName.match(exp).join('').toLowerCase().split(' ');
  let formattedBrewer = brewer.match(exp).join('').toLowerCase().split(' ');
  let beerAndBrewer = formattedBeer.concat(formattedBrewer);
  for (let i = 0; i < formattedSearch.length; i++) {
    if (beerAndBrewer.includes(formattedSearch[i])) {
      relevance += 1;
    }
  }
  return relevance;
};

let getBeerId = (ids, params, callback) => {
  let beerData = [];
  if (ids.length > 0) {
    brewdb.beer.getById(ids, params, (err, data) => {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          let icon = '';
          let brewIcon = '';
          data[i].labels ? icon = data[i].labels.medium : icon = 'img/beer-image.jpg';
          data[i].breweries[0].images ? brewIcon = data[i].breweries[0].images.medium : brewIcon = null;
          beerData.push({
            name: data[i].name,
            id: data[i].id,
            des: data[i].description || data[i].style.description,
            icon: icon,
            abv: data[i].abv + '%' || 'N/A',
            brewer: data[i].breweries[0].name || 'brewer not available',
            brewerIcon: brewIcon
          });
        }
        callback(beerData);
      }
      else if (err) {
        console.log('error getting ids: ', err);
      }
    });
  } else {
    callback([{noData: true}]);
  }
};

module.exports.getBeerData = getBeerData;
module.exports.getBeerId = getBeerId;


