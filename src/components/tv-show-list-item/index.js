import { h, Component } from 'preact';
import TvShowPoster from '../tv-show-poster/';

export default class TvShowListItem extends Component {
  render() {
    const show = this.props.show;
    console.log("DM => SHOW ", show);
    return (
      <div class="tv-show-list-item--wrapper">
        <TvShowPoster path={show.poster_path} tvShow={show.name} size="medium" />
        <div class="tv-show-list-item--title--wrapper">
          <h1>{show.name}</h1>
        </div>
        <div class="tv-show-list-item--info-wrapper">
          <p class="tv-show-list-item--network">{show.networks[0].name}</p>
          <p class="tv-show-list-item--seasons">{show.number_of_seasons}</p>
          <p class="tv-show-list-item--episodes">{show.number_of_episodes}</p>
          <p class="tv-show-list-item--status">{show.status}</p>
        </div>
      </div>
    );
  }
}

