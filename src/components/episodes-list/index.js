import { h, Component } from 'preact';
import EpisodeItem from '../episode-item';

export default class EpisodesList extends Component {
  constructor(props) {
    super(props);

    this.handleToggleEpisode = this.handleToggleEpisode.bind(this);
  }

  handleToggleEpisode(episodeId, value) {
    this.props.onToggleEpisode(episodeId, value);
  }

  render() {
    const { episodes, watched, seasonComplete } = this.props;
    
    return(
      <ul class="episodes-list--wrapper">
        {episodes.map((episode) => {
          let hasWatched; 
          if (seasonComplete) {
            hasWatched = true;
          } else {
            hasWatched = watched ? watched.includes(episode.id) : false;
          }
          return <EpisodeItem episode={episode} onToggleWatched={this.handleToggleEpisode} hasWatched={hasWatched} seasonComplete={seasonComplete} />
        })}
      </ul>
    );
  }
}
