import {
  ADD_EPISODE_WATCHED,
  REMOVE_EPISODE_WATCHED,
  ADD_SEASON_WATCHED
} from '../actions/tv-shows-watched';

const initialTVShowsWatchedState = {};

// tvShowsWatched: {
//   showId: {
//     totalEpisodes: Number,
//     episodesViewed : {
//        seasonNumber: {
//          watched: ["episodeId",...]
//          completed: boolean
//          totalEpisodes: number
//        }
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
      let seasonInfo = episodesViewed[seasonNumber] || {
        watched: [],
        completed: false
      };
      let seasonEpisodeList = seasonInfo.watched; 

      seasonEpisodeList.push(newShow.episodeInfo.episodeId);

      if(!episodesViewed[seasonNumber]) {
        episodesViewed[seasonNumber] = seasonInfo;
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
      let currentSeasonInfo = currentEpisodesViewed[currentSeasonNumber];
  
      if(!currentSeasonInfo && !currentSeasonInfo.watched.length) {
        return state;
      }

      let watched = currentSeasonInfo.watched;
      
      //find the episode to remove...
      currentEpisodesViewed[currentSeasonNumber] =
         watched.filter((episodeId) => {
          return episodeId !== showToRemove.episodeInfo.episodeId
        });

      state[currentShow.showId] = {
        totalEpisodes: currentShow.totalEpisodes,
        episodesViewed: currentEpisodesViewed
      };
      return state;

    case ADD_SEASON_WATCHED:
      let newSeasonInfo = action.showInfo;
      let tvShowToAddTo = state[newSeasonInfo.tvShow.id] || {};
      let tvShowToAddTotalEpisodes = newSeasonInfo.tvShow.number_of_episodes;
      let tvShowsWatched = tvShowToAddTo.episodesViewed || {}
      let showsWatchedSeason = tvShowsWatched[newSeasonInfo.seasonNumber] || {
        watched: [],
        completed: false
      };
      
      showsWatchedSeason.completed = true;

      if(!tvShowsWatched[newSeasonInfo.seasonNumber]) {
        tvShowsWatched[newSeasonInfo.seasonNumber] = showsWatchedSeason;
      }

      state[newSeasonInfo.tvShow.id] = {
        totalEpisodes: tvShowToAddTotalEpisodes,
        episodesViewed: tvShowsWatched 
      };

      return state;

    default:
      return state;
  }
}
