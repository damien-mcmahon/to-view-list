import { h, Component } from 'preact';
import TvShowPoster from '../tv-show-poster';
import Season from '../season';


export default class TvShowPanel extends Component {
  constructor(props) {
    super(props);
    this.sendClose = this.sendClose.bind(this);
  }

  sendClose() {
    this.props.onClose();
  }

  render() {
    const { show } = this.props;
    let seasons;
    if (this.props.show.seasons) {
      seasons = this.props.show.seasons.filter((season) => season.season_number > 0);
    }
    return (
      <div class="to-view-list--info-panel-wrapper">
        <header class="tv-show-panel--header">
          <button class="button tv-show-panel--close-button" onClick={this.sendClose}>Close</button>
          <TvShowPoster path={show.poster_path} tvShow={show.name} size="medium" />
          <div class="tv-show-panel--info-wrapper">
            <div class="tv-show-panel--title-wrapper">
              <h1 class="tv-show-panel--title">{show.name}</h1>
            </div>
            <div class="tv-show-panel--info"> 
              <p class="tv-show-panel--overview">{show.overview}</p>
            </div>
            </div>
          </header>
          <section class="tv-show-panel--seasons-list">
            {seasons.map((season, index) => {
              return <Season showId={show.id} season={season} seasonNumber={index + 1} />
            })}
          </section>
      </div>
    );
  }
};
