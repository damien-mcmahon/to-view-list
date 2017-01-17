import { h, Component } from 'preact';
import moment from 'moment';
import 'moment-duration-format';
import TvShowAPIService from '../../data/tv-shows';
import EpisodesList from '../episodes-list/';
import TVIcon from '../icon';

const ONE_MINUTE = 60 * 1000;

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
    const episodesWatchedInSeason = this.countOfEpisodesWatchedInSeason(watched, season);

    this.setState({
      episodesWatchedCount: episodesWatchedInSeason.length
    });
  }

  toggleSeasonViewed(e) {
    this.props.onWatchedSeason(this.props.season.season_number, e.target.checked);
    this.setState();
  }

  toggleEpisodesList() {
    if (!this.state.showEpisodes && !this.state.episodesForSeason.length) {
      const { season, show } = this.props;
      //TODO - push this into an dispatch get the episodes from the server
      TvShowAPIService.getEpisodesForShow(show.id, season.season_number).then((episodesInfo) => {
        this.setState({
          episodesForSeason: episodesInfo.episodes
        });
      });
    }

    this.setState({
      showEpisodes: !this.state.showEpisodes
    });
  }

  toggleEpisodeViewed(episodeId, hasWatched) {
    const seasonNumber = this.props.season.season_number;
    const currentEpisodeWatchedCount = this.state.episodesWatchedCount;
    const newEpisodeCount = hasWatched ? currentEpisodeWatchedCount + 1 : currentEpisodeWatchedCount - 1; 
    const totalEpisodes = this.props.season.episode_count;

    this.props.onWatchedEpisodes({
      seasonNumber,
      episodeId,
      totalEpisodes
    }, hasWatched);
   
    this.setState((prevState) => ({ episodesWatchedCount: newEpisodeCount }));
  }

  getButtonIcon(state) {
    if (state.showEpisodes) {
      return (
        <button class="button season--toggle-view-episodes" onClick={this.toggleEpisodesList}>
          <TVIcon iconName="up-dir" />
        </button>
      );
    } else {
      return (
        <button class="button season--toggle-view-episodes" onClick={this.toggleEpisodesList}>
          <TVIcon iconName="down-dir" />
        </button>
      );
    }
  }

  calculateSeasonDuration(show, season) {
    const averageShowDuration = show.episode_run_time.reduce((count, runTime) => count + runTime, 0) / show.episode_run_time.length;
    const seasonDuration = averageShowDuration * season.episode_count * ONE_MINUTE;
    return new moment.duration(seasonDuration).format('H ');
  }

  seasonComplete(watched, season) {
    return watched && 
      watched.episodesViewed[season.season_number] &&
      watched.episodesViewed[season.season_number].completed ? watched.episodesViewed[season.season_number].completed : false;
  }

  countOfEpisodesWatchedInSeason(watched, season) {
    return watched && watched.episodesViewed[season.season_number] ? watched.episodesViewed[season.season_number].watched : [];
  }

  render(props, state) {
    const {
      season,
      watched,
      show
    } = this.props; 

    return (
      <div class="season--wrapper">
        <div class="season--overview-wrapper">
          {this.getButtonIcon(state)}
          <input class="season--season-complete" type="checkbox" onClick={this.toggleSeasonViewed} checked={this.seasonComplete(watched, season)} />
          <h1 class="season--count">Season {season.season_number}</h1>
          <h2 class="season--episode-count">{season.episode_count} Episodes</h2>
          <h3 class="season--season-duration">
            <TVIcon iconName="clock" />
            {this.calculateSeasonDuration(show, season)}
            <span class="season--season-duration--units-label">Hours</span>
          </h3>
        </div>
        <div class="season--episodes-wrapper">
          {state.showEpisodes &&
            <EpisodesList 
              episodes={this.state.episodesForSeason} 
              onToggleEpisode={this.toggleEpisodeViewed} 
              watched={this.countOfEpisodesWatchedInSeason(watched, season)} 
              seasonComplete={this.seasonComplete(watched, season)} />
          }
        </div>
      </div>
    );
  }
}

