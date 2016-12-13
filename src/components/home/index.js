import { h, Component } from 'preact';
import TvSearch from '../tv-search';
import SearchResultList from '../search-result-list';
import style from './style';

export default class Home extends Component {

  doSearch(searchTerm){
    console.log("SEARCH", searchTerm);
  }
  
  onSelect(selectedShow) {
    console.log("SELECTED SHOW", selectedShow);
  }

	render(props, {searchResults}) {
		return (
			<div>
        <TvSearch searchFor={this.doSearch} />
        <SearchResultList resultsSet={this.searchResults} onSelect={this.selectShow} />
			</div>
		);
	}
}
