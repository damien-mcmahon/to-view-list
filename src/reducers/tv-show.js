import { ADD_TV_SHOW_TO_LIST, REMOVE_TV_SHOW_FROM_LIST } from '../actions/tv-show';

const initialTVShowState = [];

export default function tvShows(state = initialTVShowState, action) {
  switch(action.type) {
    case ADD_TV_SHOW_TO_LIST: 
      state.push(action.tvShow);
      return state;
    case REMOVE_TV_SHOW_FROM_LIST:
      let indexToRemove = state.indexOf(action.tvShow);

      if (indexToRemove >= 0) {
        state.splice(indexToRemove, 1);
      }
      return state;
    default: 
      return state;
  }
}
