export const ADD_TV_SHOW_TO_LIST = 'ADD_TV_SHOW_TO_LIST';

export function addTvShowToList(tvShowToAdd) {
  return {
    type: ADD_TV_SHOW_TO_LIST,
    tvShow: tvShowToAdd
  };
} 
