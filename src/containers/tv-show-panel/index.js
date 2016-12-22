import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import TvShowPoster from '../../components/tv-show-poster';
import Season from '../../components/season';
import TVIcon from '../../components/icon';
import { hideTvPanel } from '../../actions/tv-panel';
import { 
  addEpisodeToWatchedList, 
  removeEpisodeFromWatchedList, 
  addSeasonToWatchedList,
  removeSeasonFromWatchedList 
} from '../../actions/tv-shows-watched';
         
const panelStateToProps = (state) => ({ panel: state.tvShowPanel, watched: state.tvShowsWatched});

 class TvShowPanel extends Component {

  constructor(props) {
    super(props);
    this.closePanel = this.closePanel.bind(this);
    this.sendWatched = this.sendWatched.bind(this);
    this.sendSeasonWatched = this.sendSeasonWatched.bind(this);
  }

  closePanel() {
    const { dispatch } = this.props;
    dispatch(hideTvPanel());
  }

  sendWatched(seasonAndEpisodeInfo, hasWatched) {
    const { dispatch, panel } = this.props;
    const { tvShow } = panel;

    if (hasWatched) {
      dispatch(addEpisodeToWatchedList({
        showId: tvShow.id,
        showTotalEpisodes: tvShow.number_of_episodes,
        episodeInfo: seasonAndEpisodeInfo,
        episodesInSeason : tvShow.seasons[seasonAndEpisodeInfo.seasonNumber].episode_count
      }));
    } else {
      dispatch(removeEpisodeFromWatchedList({
        showId: tvShow.id,
        episodeInfo: seasonAndEpisodeInfo,
        episodesInSeason : tvShow.seasons[seasonAndEpisodeInfo.seasonNumber].episode_count
      }));
    }
  }

  sendSeasonWatched(seasonNumber, hasWatched) {
    const { dispatch, panel } = this.props;
    const { tvShow } = panel;
    
    if (hasWatched) {
      dispatch(addSeasonToWatchedList({
        tvShow,
        seasonNumber
      }));
    } else {

      dispatch(removeSeasonFromWatchedList({
        tvShow,
        seasonNumber
      }));
    }
  }

  render() {
    const { tvShow:show, visible} = this.props.panel;
    const { watched } = this.props;
    let seasons;

    if (!visible) {
      return;
    }

    const episodesWatched = watched[show.id];

    if (show.seasons) {
      seasons = show.seasons.filter((season) => season.season_number > 0);
    }

    return (
      <div class="to-view-list--info-panel-wrapper">
        <header class="tv-show-panel--header">
          <button class="button tv-show-panel--close-button" onClick={this.closePanel}>
            <TVIcon iconName="cancel" />
          </button>
          <TvShowPoster path={show.poster_path} tvShow={show.name} size="medium" />
          <div class="tv-show-panel--info-wrapper">
            <div class="tv-show-panel--title-wrapper">
              <h1 class="tv-show-panel--title">{show.name}</h1>
            </div>
          </div>
        </header>
        <section class="tv-show-panel--seasons-list">
          {seasons.map((season, index) => {
            //TODO: Pass only the watched episodes for the season
            return <Season showId={show.id} season={season} watched={episodesWatched} onWatchedEpisodes={this.sendWatched} onWatchedSeason={this.sendSeasonWatched} />
          })}
        </section>
    </div>
    );
  }
}

export default connect(panelStateToProps)(TvShowPanel); 
