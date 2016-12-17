import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import TvSearch from '../../components/tv-search';
import SearchResultList from '../../components/search-result-list';
import TvShowList from '../../components/tv-show-list';
import TvShowPanel from '../../components/tv-show-panel';

import TvShowAPIService from '../../data/tv-shows';
import { 
  addTvShowToList, 
  removeTvShowFromList 
} from '../../actions/tv-show';

const appStateToProps = (state) => ({ showList: state.tvShows });

class Home extends Component {
  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);
    this.selectShow = this.selectShow.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.showInfoPanel = this.showInfoPanel.bind(this);
    this.panelCloseHandler = this.panelCloseHandler.bind(this);

    this.state = {
      clearSearch: false,
      panelToView: null
    };
  }

  doSearch(searchTerm) {
    TvShowAPIService.searchForShows(searchTerm).then((response) => {
      //dispatch to State...
      if (response.results) {
        this.setState({
          searchResults: response.results,
          clearSearch: false
        });
      }
    });
  }
  
  selectShow(selectedShow) {
    const { dispatch } = this.props;

    TvShowAPIService.getTvShowInfo(selectedShow.id).then((tvShow) => {
      dispatch(addTvShowToList(tvShow));

      this.setState({
        searchResults: null,
        clearSearch: true
      });
    });
  }

  removeItem(tvShow) {
    const { dispatch } = this.props;
    dispatch(removeTvShowFromList(tvShow));
    this.setState();
  }

  showInfoPanel(tvShow) {
    //get the episodes info for the show..

    this.setState({
      panelToView: tvShow,
    });
  }

  panelCloseHandler() {
    this.setState({
      panelToView: null
    });
  }

	render() {
    let shows = this.props.showList;
    
		return (
			<div class="to-view-list--home--wrapper">
        <TvSearch searchFor={this.doSearch} clearSearch={this.state.clearSearch}/>
        <SearchResultList resultsSet={this.state.searchResults} onSelect={this.selectShow} />
        <TvShowList shows={shows} removeItem={this.removeItem} showInfoPanel={this.showInfoPanel}/>
        {this.state.panelToView &&
          <TvShowPanel show={this.state.panelToView} onClose={this.panelCloseHandler}/>
        }
			</div>
		);
	}
}
export default connect(appStateToProps)(Home);
