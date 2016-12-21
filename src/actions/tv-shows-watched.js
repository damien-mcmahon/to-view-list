export const ADD_EPISODE_WATCHED = 'ADD_EPISODE_WATCHED';
export const REMOVE_EPISODE_WATCHED = 'REMOVE_EPISODE_WATCHED';


export function addEpisodeToWatchedList(showInfo) {
  return {
    type: ADD_EPISODE_WATCHED,
    showInfo
  }
}

export function removeEpisodeFromWatchedList(showInfo) {
  return {
    type: REMOVE_EPISODE_WATCHED,
    showInfo
  }
}
