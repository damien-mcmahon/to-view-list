import fetchJSONP from 'fetch-jsonp';

const API_BASE = 'https://api.themoviedb.org/3/';
const API_KEY = '4c7f9853119ef8c124433ee8a0f7fcec';
const API_PATHS = {
  'search': 'search/tv'
}

function getAPIPathFromType(type, data) {
  data.api_key = API_KEY;
  return `${API_PATHS[type]}${dataToQueryParams(data)}`;
}

function dataToQueryParams(data) {
  let keys = Object.keys(data);
  let values = Object.values(data);
  let paramString = '?';

  return paramString + keys.map((key, index) => `${key}=${urlSafe(values[index])}`).join('&');
}

function urlSafe(value) {
  return encodeURIComponent(value);
}

//make API requests..
function buildAPIUrl(apiType, data) {
  return `${API_BASE}${getAPIPathFromType(apiType, data)}`;
}

const TVShowAPIService = {
  searchForShows(query) {
    return fetchJSONP(buildAPIUrl('search', {query:query})).then((response) => {
      return response.json()
    }); 
  }
};

export default TVShowAPIService;
