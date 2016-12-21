import {
  ADD_EPISODE_WATCHED,
  REMOVE_EPISODE_WATCHED
} from '../actions/tv-shows-watched';

const initialTVShowsWatchedState = {};

// tvShowsWatched: {
//   showId: {
//     totalEpisodes: Number,
//     episodesViewed : {
//        seasonNumber: ["episodeId",...]
//     }
//   } 
//}
//

export default function tvShowsWatched(state = initialTVShowsWatchedState, action) {
  //TODO: Make this actually immutable and cleaner
  switch(action.type) {
    case ADD_EPISODE_WATCHED: 
      let newShow = action.showInfo;
      let show = state[newShow.showId] || {};
      let totalEpisodes = show.totalEpisodes || newShow.showTotalEpisodes;
      let episodesViewed = show.episodesViewed || {};
      let seasonNumber = `${newShow.episodeInfo.seasonNumber}`;
      let seasonEpisodeList = episodesViewed[seasonNumber] || [];
      
      seasonEpisodeList.push(newShow.episodeInfo.episodeId);

      if(!episodesViewed[seasonNumber]) {
        episodesViewed[seasonNumber] = seasonEpisodeList;
      }

      state[newShow.showId] = {
        totalEpisodes,
        episodesViewed 
      };
      return state;

    case REMOVE_EPISODE_WATCHED: 
      let showToRemove = action.showInfo;
      let currentShow = state[showToRemove.showId];
      let currentEpisodesViewed = currentShow.episodesViewed || [];
      let currentSeasonNumber = `${showToRemove.episodeInfo.seasonNumber}`;

      if(!currentEpisodesViewed[currentSeasonNumber].length) {
        return state;
      }
      
      //find the episode to remove...
      currentEpisodesViewed[currentSeasonNumber] =
         currentEpisodesViewed[currentSeasonNumber].filter((episodeId) => {
          return episodeId !== showToRemove.episodeInfo.episodeId
        });

      state[currentShow.showId] = {
        totalEpisodes: currentShow.totalEpisodes,
        episodesViewed: currentEpisodesViewed
      };
      return state;

    default:
      return state;
  }
}
