import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import TvSearch from '../../components/tv-search';
import SearchResultList from '../../components/search-result-list';
import TvShowList from '../../components/tv-show-list';
import TvShowPanel from '../tv-show-panel';
import SummaryFooter from '../../components/summary-footer';

import TvShowAPIService from '../../data/tv-shows';
import { 
  addTvShowToList, 
  removeTvShowFromList 
} from '../../actions/tv-show';
import {
  showTvPanel,
  hideTvPanel
} from '../../actions/tv-panel'

const appStateToProps = (state) => ({
  showList: state.tvShows,
  showPanel: state.tvShowPanel,
  watchedShows: state.tvShowsWatched
});

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
      searchResults: []
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
        searchResults: [],
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
    const { dispatch } = this.props;
    dispatch(showTvPanel(tvShow));
  }

  panelCloseHandler() {
    const { dispatch } = this.props;
    dispatch(hideTvPanel());
  }

	render(props, state) {
    const { showList:shows, watchedShows } = props;
		return (
			<div class="to-view-list--home--wrapper">
        <div class="home-view--search-wrapper">
          <TvSearch searchFor={this.doSearch} clearSearch={state.clearSearch}/>
          <SearchResultList resultsSet={state.searchResults} onSelect={this.selectShow} />
        </div>
        <TvShowList
         shows={shows} 
         watchedShows={props.watchedShows}
         removeItem={this.removeItem} 
         showInfoPanel={this.showInfoPanel}
        />
        {this.props.showPanel.visible &&
          <TvShowPanel />
        }
        <SummaryFooter shows={shows} watched={props.watchedShows} />
			</div>
		);
	}
}
export default connect(appStateToProps)(Home);
