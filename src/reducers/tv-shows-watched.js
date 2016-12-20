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
  switch(action.type) {
    default:
      return state;
  }
}
