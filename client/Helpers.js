const $ = require('jquery');

const Helpers = {
  //Handles all ajax calls
  ajaxCalls: (type, url, data, caller, callback) => {
    $.ajax({
      type: type,
      url: url,
      data: data,
      success: (data) => {
        callback(data);
      },
      error: (error) => {
        console.log('error on ajax call from ' + caller + ': ' , error);
      }
    });
  },
  //Prevents HTML injection from user's search
  preventInjection: (search) => {
    let filter = /[a-zA-Z0-9\s]/g;
    let filteredSearch = search.match(filter).join('');
    return filteredSearch;
  }
}

module.exports = Helpers;