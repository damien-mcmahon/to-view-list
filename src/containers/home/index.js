import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import TvSearch from '../../components/tv-search';
import SearchResultList from '../../components/search-result-list';
import TvShowList from '../../components/tv-show-list';
import TvShowAPIService from '../../data/tv-shows';

import style from './style';

const appStateToProps = (state) => ({ showList: state.tvShows });

class Home extends Component {
  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);
    this.selectShow = this.selectShow.bind(this);
  }

  doSearch(searchTerm) {
    TvShowAPIService.searchForShows(searchTerm).then((response) => {
      //dispatch to State...
      if (response.results) {
        this.setState({
          searchResults: response.results
        });
      }
    });
  }
  
  selectShow(selectedShow) {
    const { dispatch } = this.props;

    //dispatch
    this.setState({
      searchResults: null
    });
  }

	render(props, {searchResults}) {
    let shows = this.props.showList;

		return (
			<div class="to-view-list--home--wrapper">
        <TvSearch searchFor={this.doSearch} />
        <SearchResultList resultsSet={this.state.searchResults} onSelect={this.selectShow} />
        <TvShowList shows={this.props.showList}/>
			</div>
		);
	}
}
export default connect(appStateToProps)(Home);