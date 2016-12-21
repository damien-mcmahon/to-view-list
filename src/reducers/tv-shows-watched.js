import {
  ADD_EPISODE_WATCHED,
  REMOVE_EPISODE_WATCHED,
  ADD_SEASON_WATCHED,
  REMOVE_SEASON_WATCHED
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
  let newShow;
  let show;
  let totalEpisodes;
  let seasonNumber;
  let episodesViewed;
  let seasonInfo;
  let seasonEpisodeList;
  let showsWatchedSeason
  switch(action.type) {
    case ADD_EPISODE_WATCHED: 
      newShow = action.showInfo;
      show = state[newShow.showId] || {};
      totalEpisodes = show.totalEpisodes || newShow.showTotalEpisodes;
      episodesViewed = show.episodesViewed || {};
      seasonNumber = `${newShow.episodeInfo.seasonNumber}`;
      seasonInfo = episodesViewed[seasonNumber] || {
        watched: [],
        completed: false
      };
      seasonEpisodeList = seasonInfo.watched; 

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
      debugger;
      newShow = action.showInfo;
      show = state[newShow.showId];
      episodesViewed = show.episodesViewed || [];
      seasonNumber = `${newShow.episodeInfo.seasonNumber}`;
      seasonInfo = episodesViewed[seasonNumber];
  
      if(!seasonInfo && !seasonInfo.watched.length) {
        return state;
      }

      let watched = seasonInfo.watched;
      
      //find the episode to remove...
      episodesViewed[seasonNumber].watched =
         watched.filter((episodeId) => {
          return episodeId !== newShow.episodeInfo.episodeId
        });

      state[show.showId] = {
        totalEpisodes: show.totalEpisodes,
        episodesViewed
      };
      return state;

    case ADD_SEASON_WATCHED:
      newShow = action.showInfo;
      show = state[newShow.tvShow.id] || {};
      totalEpisodes = newShow.tvShow.number_of_episodes;
      episodesViewed = show.episodesViewed || {}
      showsWatchedSeason = episodesViewed[newShow.seasonNumber] || {
        watched: [],
        completed: false
      };
      
      showsWatchedSeason.completed = true;

      if(!episodesViewed[newShow.seasonNumber]) {
        episodesViewed[newShow.seasonNumber] = showsWatchedSeason;
      }

      state[newShow.tvShow.id] = {
        totalEpisodes,
        episodesViewed
      };

      return state;

    case REMOVE_SEASON_WATCHED:
      newShow = action.showInfo;
      show = state[newShow.tvShow.id] || {};
      totalEpisodes = newShow.tvShow.number_of_episodes;
      episodesViewed = show.episodesViewed || {}
      showsWatchedSeason = episodesViewed[newShow.seasonNumber] || {
        watched: [],
        completed: false
      };
      
      showsWatchedSeason.completed = false;

      if(!episodesViewed[newShow.seasonNumber]) {
        episodesViewed[newShow.seasonNumber] = showsWatchedSeason;
      }

      state[newShow.tvShow.id] = {
        totalEpisodes,
        episodesViewed
      };

      return state;

    default:
      return state;
  }
}
