import { h, Component } from 'preact';
import TvShowPoster from '../tv-show-poster/';
import TVIcon from '../icon';
import ProgressBar from '../progress';

const STATUS_TO_CSS_MAP = {
  'ended': '--has-ended',
  'returning series': '--is-returning'
};

const RADIX = 10;
const ZERO = 0;
const POSTER_SIZE = "medium";

export default class TvShowListItem extends Component {
  constructor(props) {
    super(props);
    this.removeButtonClickHandler = this.removeButtonClickHandler.bind(this);
    this.showInfoPanel = this.showInfoPanel.bind(this);
  }

  removeButtonClickHandler() {
    this.props.onRemove(this.props.show);
  }

  showInfoPanel() {
    this.props.onInfoClick(this.props.show);
  }

  countEpisodesWatched(show, watchedEpisodes = {}) {
    const { episodesViewed } = watchedEpisodes; 

    if (!episodesViewed || !watchedEpisodes) {
      return ZERO;
    }

    const seasons = Object.keys(episodesViewed);

    return seasons.reduce((totalCount, seasonNumber) => {
      const showSeason = show.seasons.find((season) => season.season_number === parseInt(seasonNumber, RADIX))
      const episodesToAddToCount =
        episodesViewed[seasonNumber].completed ? 
          showSeason.episode_count : episodesViewed[seasonNumber].watched.length;
      return totalCount + episodesToAddToCount;
    }, ZERO);
  }

  render = props => (
      <div class={`tv-show-list-item--wrapper ${STATUS_TO_CSS_MAP[props.show.status.toLowerCase()]}`}>
        <TvShowPoster 
          path={props.show.poster_path}
          tvShow={props.show.name}
          size={POSTER_SIZE}
          onClick={this.showInfoPanel} />
        <div class="tv-show-list-item--info-section-wrapper">
          <div class="tv-show-list-item--title-wrapper">
            <h1 class="tv-show-list-item--title">
              {props.show.name}
            </h1>
            <div class="tv-show-list-item--actions-wrapper">
              <button class="button tv-show-list-item--info" onClick={this.showInfoPanel}>
                <TVIcon iconName="info" />
              </button>
              <button class="button tv-show-list-item--remove" onClick={this.removeButtonClickHandler}>
                <TVIcon iconName="cancel" />
              </button>
            </div>
          </div>
          <div class="tv-show-list-item--info-wrapper">
            <span class="tv-show-list-item--seasons">{props.show.number_of_seasons} seasons</span>
            <span class="tv-show-list-item--episodes">{props.show.number_of_episodes} epidodes</span>
          </div>
          <div class="tv-show-list-item--progress-wrapper">
            <ProgressBar total={props.show.number_of_episodes} progress={this.countEpisodesWatched(props.show, props.watchedInfo)} /> 
          </div>
        </div>
      </div>
    );
}

