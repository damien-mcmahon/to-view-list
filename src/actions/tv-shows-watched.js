export const ADD_EPISODE_WATCHED = 'ADD_EPISODE_WATCHED';
export const REMOVE_EPISODE_WATCHED = 'REMOVE_EPISODE_WATCHED';
export const ADD_SEASON_WATCHED = 'ADD_SEASON_WATCHED';
export const REMOVE_SEASON_WATCHED = 'REMOVE_SEASON_WATCHED';

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

export function addSeasonToWatchedList(showInfo) {
  return {
    type: ADD_SEASON_WATCHED,
    showInfo
  }
}

export function removeSeasonFromWatchedList(showInfo) {
  return {
    type: REMOVE_SEASON_WATCHED,
    showInfo
  }
}
