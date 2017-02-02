import { h, Component } from 'preact';
import SearchResultItem from '../search-result-item';
import { compose, defaultProps, pure } from 'recompose';

const enhanced = compose(
  defaultProps({ resultsSet: []}),
  pure
);

const SearchResultList = props => (
  <ul class="search-result-list--wrapper">
    {props.resultsSet && props.resultsSet.map((result) => {
      return <SearchResultItem result={result} onClick={props.onSelect} />
      })
    } 
  </ul>
);

export default enhanced(SearchResultList);
