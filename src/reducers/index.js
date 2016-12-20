import { combineReducers } from 'redux';
import tvShows from './tv-show';
import tvShowPanel from './tv-show-panel';
import tvShowsWatched from './tv-shows-watched';

export default combineReducers({
  tvShows,
  tvShowPanel,
  tvShowsWatched
});
