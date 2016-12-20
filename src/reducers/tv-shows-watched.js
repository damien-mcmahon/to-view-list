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


    default:
      return state;
  }
}
