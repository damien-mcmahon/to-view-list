import { ADD_TV_SHOW_TO_LIST } from '../actions/tv-show';

const initialTVShowState = [];

export default function tvShows(state = initialTVShowState, action) {
  switch(action.type) {
    case ADD_TV_SHOW_TO_LIST: 
      state.push(action.tvShow);
      return state;
    default: 
      return state;
  }
}
