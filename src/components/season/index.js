import { h, Component } from 'preact';
import TvShowAPIService from '../../data/tv-shows';
import EpisodesList from '../episodes-list/';

export default class Season extends Component {
  constructor(props) {
    super(props);
    this.toggleSeasonViewed = this.toggleSeasonViewed.bind(this);
    this.toggleEpisodesList = this.toggleEpisodesList.bind(this);
    this.toggleEpisodeViewed = this.toggleEpisodeViewed.bind(this);

    this.state = {
      showEpisodes: false,
      episodesForSeason: [],
      episodesWatchedCount: 0
    }
  }

  componentWillMount() {
    //TODO: set the season completed state...
    const { season, watched } = this.props;
    const seasonEpisodesCount = season.episode_count;
    const seasonNumber = season.season_number;
    const episodesWatchedInSeason = watched && watched.episodesViewed && watched.episodesViewed[seasonNumber] ? watched.episodesViewed[seasonNumber] : [];

    this.setState({
      episodesWatchedCount: episodesWatchedInSeason.length
    });
  }

  toggleSeasonViewed(e) {
    //TODO: Set "ALL" for watched when this is pressed
    this.props.onWatchedSeason(this.props.season.season_number, e.target.checked);
  }

  checkSeasonIsWatched(props, state) {
    const { season } = props;
    return season.episode_count === state.episodesWatchedCount;
  }

  toggleEpisodesList() {
    if (!this.state.showEpisodes && !this.state.episodesForSeason.length) {
      const { season, showId } = this.props;
      //get the episodes from the server
      TvShowAPIService.getEpisodesForShow(showId, season.season_number).then((episodesInfo) => {
        this.setState({
          episodesForSeason: episodesInfo.episodes
        });
      });
    }

    this.setState({
      showEpisodes: !this.state.showEpisodes
    });
  }

  toggleEpisodeViewed(episodeId, hasWatched){
    const seasonNumber = this.props.season.season_number;
    const currentEpisodeWatchedCount = this.state.episodesWatchedCount;
    const newEpisodeCount = hasWatched ? currentEpisodeWatchedCount + 1 : currentEpisodeWatchedCount - 1; 

    this.props.onWatchedEpisodes({
      seasonNumber,
      episodeId,
    }, hasWatched);
   
    this.setState((prevState) => ({ episodesWatchedCount: newEpisodeCount }));
  }

  render(props, state) {
    const {
      season,
      watched
    } = this.props; 

    const watchedForSeason = watched && watched.episodesViewed[season.season_number] ? watched.episodesViewed[season.season_number].watched : [];
    const seasonIsComplete = this.checkSeasonIsWatched(props, state);

    return (
      <div class="season--wrapper">
        <div class="season--overview-wrapper">
          <h1 class="season--count">Season {season.season_number}</h1>
          <input type="checkbox" onClick={this.toggleSeasonViewed} checked={seasonIsComplete} />
        </div>
        <div class="season--episodes-wrapper">
          <button class="button season--toggle-view-episodes" onClick={this.toggleEpisodesList}>TOGGLE</button>
          <span class="season--episdoe-count">{season.episode_count} Episodes</span>
          {this.state.showEpisodes &&
            <EpisodesList episodes={this.state.episodesForSeason} onToggleEpisode={this.toggleEpisodeViewed} watched={watchedForSeason} />
          }
        </div>
      </div>
    );
  }
}

