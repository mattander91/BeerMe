const request = require('request');
const BreweryDb = require('brewerydb-node');
const apiKey = process.env.KEY;
const brewdb = new BreweryDb(apiKey);


//Calls brewery API search endpoint
let getBeerData = (search, callback) => {
  brewdb.search.beers({q: search, withBreweries: 'Y'}, (err, data) => {
    if (data) {
      callback(filterData(data, search, true));
    } else if (err) {
      // console.log('error getting data: ', err);
      callback([{noData: true}]);
    } else {
      callback([{noData: true}]);
    }
  });
}

let getBeerId = (ids, params, callback) => {
  let beerData = [];
  if (ids.length > 0) {
    brewdb.beer.getById(ids, params, (err, data) => {
      if (data) {
        callback(filterData(data));
      }
      else if (err) {
        // console.log('error getting ids: ', err);
        callback([{noData: true}]);
      }
    });
  } else {
    callback([{noData: true}]);
  }
};

//filters out data for searching beers and user's lists
let filterData = (data, search, rel) => {
  let beerData = [];
  let relevance = null;
  for (let i = 0; i < data.length; i++) {
    if (rel) {
      relevance = addRelevance(search, data[i].name, data[i].breweries[0].name);
    }
    if (!rel || relevance > 0) {
      beerData.push({
        name: data[i].name,
        id: data[i].id,
        des: data[i].description || data[i].style ? data[i].style.description : '',
        icon: data[i].labels ? data[i].labels.medium : 'img/beer-image.jpg',
        abv: data[i].abv,
        ibu: data[i].ibu,
        brewer: data[i].breweries[0].name,
        brewerIcon: data[i].breweries[0].images ? data[i].breweries[0].images.medium : null,
        relevance: relevance
      });
    }
  }
  return beerData;
}

 //Aadds relevance each time a users search word(s) is found in the combined brewery + beer name
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



module.exports.getBeerData = getBeerData;
module.exports.getBeerId = getBeerId;
