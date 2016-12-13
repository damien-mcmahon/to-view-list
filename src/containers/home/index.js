import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import TvSearch from '../tv-search';
import SearchResultList from '../search-result-list';
import TvShowList from '../../containers/tv-show-list';

import style from './style';

const appStateToProps = (state) => ({showList: state.tvShows});

class Home extends Component {

  doSearch(searchTerm){
    console.log("SEARCH", searchTerm);
  }
  
  onSelect(selectedShow) {
    console.log("SELECTED SHOW", selectedShow);
  }

	render(props, {searchResults}) {
    let shows = this.props.showList;

    console.log("DM -> SHOWS", shows);

		return (
			<div>
        <TvSearch searchFor={this.doSearch} />
        <SearchResultList resultsSet={this.searchResults} onSelect={this.selectShow} />
        <TvShowList shows={this.props.showList}/>
			</div>
		);
	}
}
export default connect(appStateToProps)(Home);
