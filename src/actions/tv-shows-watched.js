export const ADD_EPISODE_WATCHED = 'ADD_EPISODE_WATCHED';
export const REMOVE_EPISODE_WATCHED = 'REMOVE_EPISODE_WATCHED';


export function addEpisodeToWatchedList(showId, episodeInfo) {
  return {
    action: ADD_EPISODE_WATCHED,
    showInfo: {
      showId,
      episodeInfo
    }
  }
}
export function removeEpisodeFromWatchedList(showId, episodeInfo) {
  return {
    action: REMOVE_EPISODE_WATCHED,
    showInfo: {
      showId,
      episodeInfo
    }
  }
}
