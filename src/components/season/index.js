import { h, Component } from 'preact';
import TvShowAPIService from '../../data/tv-shows';
import EpisodesList from '../episodes-list/';

export default class Season extends Component {
  constructor(props) {
    super(props);
    this.setSeasonViewed = this.setSeasonViewed.bind(this);
    this.toggleEpisodesList = this.toggleEpisodesList.bind(this);

    this.state = {
      seasonViewed: false,
      showEpisodes: false,
      episodesForSeason: []
    }
  }

  setSeasonViewed(e) {
    this.setState({
      seasonViewed: e.target.checked
    });
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

  render() {
    const {
      season,
    } = this.props; 

    return (
      <div class="season--wrapper">
        <div class="season--overview-wrapper">
          <h1 class="season--count">Season {season.season_number}</h1>
          <input type="checkbox" onClick={this.setSeasonViewed} checked={this.state.seasonViewed} />
        </div>
        <div class="season--episodes-wrapper">
          <button class="button season--toggle-view-episodes" onClick={this.toggleEpisodesList}>TOGGLE</button>
          <span class="season--episdoe-count">{season.episode_count} Episodes</span>
          <EpisodesList episodes={this.state.episodesForSeason} />
        </div>
      </div>
    );
  }
}

