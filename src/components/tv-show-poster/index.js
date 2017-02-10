import { h, Component } from 'preact';
import { compose, pure, mapProps } from 'recompose';

//TODO: Set the configuration via a call at load time
const BASE_URL = 'http://image.tmdb.org/t/p/';
const SIZES = {
  'small' : 'w45',
  'medium': 'w185',
  'large' : 'w342' 
};

const enhanced = compose(
  mapProps(props => ({
    posterPath: `${BASE_URL}${SIZES[props.size]}${props.path}` 
  })),
  pure
);

const TvShowPoster = props => (
  <div class="tv-show-poster--wrapper" onClick={props.onClick}>
    <img 
      src={props.posterPath} 
      alt={`Poster for ${props.tvShow}`} 
      class={`tv-show-poster tv-show-poster--${props.size}`} />
  </div>
);

export default enhanced(TvShowPoster);
