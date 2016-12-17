import { h, Component } from 'preact';
import moment from 'moment';
import TvShowPoster from '../tv-show-poster/';

const STATUS_TO_CSS_MAP = {
  'ended': '--has-ended',
  'returning series': '--is-returning'
};

export default class TvShowListItem extends Component {
  constructor(props) {
    super(props);
    this.removeButtonClickHandler = this.removeButtonClickHandler.bind(this);
  }

  removeButtonClickHandler() {
    this.props.onRemove(this.props.show);
  }


  dayOfWeekAired(show) {
    let airDate = new moment(show.last_air_date);

    return airDate.format('dddd');
  }

  render() {
    const show = this.props.show;
    const cssStatusClass = STATUS_TO_CSS_MAP[show.status.toLowerCase()];
    return (
      <div class={`tv-show-list-item--wrapper ${cssStatusClass}`}>
        <TvShowPoster path={show.poster_path} tvShow={show.name} size="medium" />
        <div class="tv-show-list-item--info-section-wrapper">
          <div class="tv-show-list-item--title-wrapper">
            <h1 class="tv-show-list-item--title">
              <a href={show.homepage} target="_blank">{show.name}</a>
            </h1>
            {show.networks.map((network) => {
              <span class="tv-show-list-item--network-name">{network.name}</span>
            })}
            <button class="button tv-show-list-item--info" onClick={this.showInfoPanel}>info</button>
            <button class="button tv-show-list-item--remove" onClick={this.removeButtonClickHandler}>X</button>
          </div>
          <div class="tv-show-list-item--info-wrapper">
            <span class="tv-show-list-item--seasons">{show.number_of_seasons} seasons</span>
            <span class="tv-show-list-item--episodes">{show.number_of_episodes} epidodes</span>
            {show.in_production &&
              <span class="tv-show-list-item--day-of-week">{this.dayOfWeekAired(show)}</span>
            }
          </div>
          <div class="tv-show-list-item--progress-wrapper">
          </div>
        </div>
      </div>
    );
  }
}

