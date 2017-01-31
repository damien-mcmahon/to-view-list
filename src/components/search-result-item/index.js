import { h, Component } from 'preact';
import { pure } from 'recompose';
import TvShowPoster from '../tv-show-poster/';
import TVIcon from '../icon';


const SearchResultItem = props => (
      <li class="search-result-item--wrapper" onClick={props.onClick.bind(null, props.result)}>
        <TvShowPoster 
          path={props.result.poster_path} 
          tvShow={props.result.name} 
          size="small" 
          onClick={props.onClick.bind(null, props.result)} 
        />
        <h1 class="search-result-item--name">{props.result.name}</h1>
        <button class="button --action-add search-result-item--add-to-list" onClick={this.sendItem}>
          <TVIcon iconName="plus" />
        </button>
      </li>
    );

export default pure(SearchResultItem);
