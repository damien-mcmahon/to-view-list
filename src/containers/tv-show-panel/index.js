import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import TvShowPoster from '../../components/tv-show-poster';
import Season from '../../components/season';
import { hideTvPanel } from '../../actions/tv-panel';
import { addEpisodeToWatchedList, removeEpisodeFromWatchedList } from '../../actions/tv-shows-watched';

const panelStateToProps = (state) => ({ panel: state.tvShowPanel, watched: state.tvShowsWatched});

 class TvShowPanel extends Component {
  constructor(props) {
    super(props);
    this.closePanel = this.closePanel.bind(this);
  }

  closePanel() {
    const { dispatch } = this.props;
    dispatch(hideTvPanel());
  }

  render() {
    const { tvShow:show, visible} = this.props.panel;
    let seasons;

    if (!visible) {
      return;
    }

    if (show.seasons) {
      seasons = show.seasons.filter((season) => season.season_number > 0);
    }
    
    return (
      <div class="to-view-list--info-panel-wrapper">
        <header class="tv-show-panel--header">
          <button class="button tv-show-panel--close-button" onClick={this.closePanel}>Close</button>
          <TvShowPoster path={show.poster_path} tvShow={show.name} size="medium" />
          <div class="tv-show-panel--info-wrapper">
            <div class="tv-show-panel--title-wrapper">
              <h1 class="tv-show-panel--title">{show.name}</h1>
            </div>
          </div>
        </header>
        <section class="tv-show-panel--seasons-list">
          {seasons.map((season, index) => {
            return <Season showId={show.id} season={season} onWatchedSeason={this.sendWatched}/>
          })}
        </section>
    </div>
    );
  }
}

export default connect(panelStateToProps)(TvShowPanel); 
