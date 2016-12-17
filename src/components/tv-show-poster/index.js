import { h, Component } from 'preact';
//TODO: Set the configuration via a call at load time
const BASE_URL = 'http://image.tmdb.org/t/p/';
const SIZES = {
  'small' : 'w45',
  'medium': 'w185',
  'large' : 'w342' 
};

export default class TvShowPoster extends Component {
  render() {
    const tvShowName = this.props.tvShow;
    const posterSize = this.props.size;
    const posterPath = `${BASE_URL}${SIZES[this.props.size]}${this.props.path}`;

    return (
      <div class="tv-show-poster--wrapper">
        <img src={posterPath} alt={`Poster for ${tvShowName}`} class={`tv-show-poster tv-show-poster--${posterSize}`} />
      </div>
    );
  }
};

