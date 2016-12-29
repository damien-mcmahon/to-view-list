import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import moment from 'moment';

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
         
const AIRED_DATE_FORMAT = 'dddd';
const LAST_AIR_DATE_FORMAT = 'MMM Do YYYY';
const NETWORKS_WITHOUT_RELEASE_DATES = ['netflix'];


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
    this.setState();
  }

  //TODO: This is probably a component method
  dayOfWeekAired(show) {
    let airDate = new moment(show.last_air_date);
    return `${airDate.format(AIRED_DATE_FORMAT)}s`;
  }

  //TODO: This is probably a component
  tvShowNetworkBadge(show) {
    const primaryNetwork = show.networks[0];
    return (
      <p class={`tv-show-panel--network-badge network-badge --network-${primaryNetwork.name.toLowerCase().replace(' ', '-')}`}>
        {primaryNetwork.name}
      </p>
    );
  }

  //TODO: Handle displaying this better - maybe a service
  canShowAirDateLabel(show) {
    const primaryNetwork = show.networks[0];
  
    return !NETWORKS_WITHOUT_RELEASE_DATES.includes(primaryNetwork.name.toLowerCase());
  }

  //TODO: This is probably a component
  showNextAirDate(show) {
    const lastAirDate = new moment(show.last_air_date);

    if (lastAirDate.isAfter(new moment())){
      return (
        <span class="tv-show-panel--last-aired-date">
          <span class="tv-show-panel--info-label">Next Episode:</span>
          <TVIcon iconName="calendar" />
          {lastAirDate.format(LAST_AIR_DATE_FORMAT)} 
        </span> 
      );
    }
  }

  render() {
    const { tvShow:show, visible} = this.props.panel;

    if (!visible) {
      return;
    }

    const { watched } = this.props;
    let seasons;
    const showRunTime = `${show.episode_run_time[0]} mins`;
    const episodesWatched = watched[show.id];
    const showAirDay = this.dayOfWeekAired(show);
    const displayShowAirDay = show.in_production && this.canShowAirDateLabel(show);

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
              <h1 class="tv-show-panel--title">
                <a href={show.homepage} target="_blank" rel="noopener">
                  {show.name}
                </a>
                <TVIcon iconName="link-ext-alt" />
              </h1>
            </div>
            <div class="tv-show-panel--show-info">
              {this.tvShowNetworkBadge(show)}
              {displayShowAirDay &&
                <span class="tv-show-panel--show-day-of-week">
                  <span class="tv-show-panel--info-label">Aired on: </span>
                  <TVIcon iconName="calendar-empty" />
                  {showAirDay}
                </span>
              }
              <span class="tv-show-panel--runtime">
                <span class="tv-show-panel--info-label">Runtime:</span>
                <TVIcon iconName="stopwatch" />
                {showRunTime}
              </span>
              {show.in_production && this.showNextAirDate(show)}
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
