import fetchJSONP from 'fetch-jsonp';

const API_BASE = 'https://api.themoviedb.org/3/';
const API_KEY = '4c7f9853119ef8c124433ee8a0f7fcec';
const API_PATHS = {
  'search' : 'search/tv',
  'tv-show': 'tv'
};
const DEFAULT_LANGUAGE = 'en-GB';
const DEFAULT_PROPS = {
  api_key: API_KEY,
  language: DEFAULT_LANGUAGE
}

function getAPIPathFromType(type, data) {
  if (type === 'search') {
    return `${API_PATHS[type]}${dataToQueryParams(Object.assign(DEFAULT_PROPS, data))}`;
  }

  if (type === 'tv-show') {
    return `${API_PATHS[type]}/${data.id}${dataToQueryParams(DEFAULT_PROPS)}`;
  }
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
    return fetchJSONP(buildAPIUrl('search', { query:query })).then((response) => response.json()); 
  },

  getTvShowInfo(tvShowId) {
    return fetchJSONP(buildAPIUrl('tv-show', { id: tvShowId })).then((response) => response.json());
  }
};

export default TVShowAPIService;
