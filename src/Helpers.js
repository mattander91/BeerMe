import $ from 'jquery';

const Helpers = {

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

  preventInjection: (search) => {
    let filter = /[a-zA-Z0-9\s]/g;
    let filteredSearch = search.match(filter).join('');
    return filteredSearch;
  }

}

export default Helpers;