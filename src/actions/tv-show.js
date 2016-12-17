export const ADD_TV_SHOW_TO_LIST = 'ADD_TV_SHOW_TO_LIST';
export const REMOVE_TV_SHOW_FROM_LIST = 'REMOVE_TV_SHOW_FROM_LIST';

export function addTvShowToList(tvShowToAdd) {
  return {
    type: ADD_TV_SHOW_TO_LIST,
    tvShow: tvShowToAdd
  };
} 

export function removeTvShowFromList(tvShowToRemove) {
  return {
    type: REMOVE_TV_SHOW_FROM_LIST,
    tvShow: tvShowToRemove
  };
}
