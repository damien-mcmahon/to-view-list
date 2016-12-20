import { h, Component } from 'preact';
import EpisodeItem from '../episode-item';

export default class EpisodesList extends Component {
  constructor(props) {
    super(props);

    this.handleToggleEpisode = this.handleToggleEpisode.bind(this);
  }

  handleToggleEpisode(episodeId, value) {
    console.log("DM => Handling::", episodeId, value);
  }

  render() {
    const { episodes } = this.props;

    return(
      <ul class="episodes-list--wrapper">
        {episodes.map((episode) => <EpisodeItem episode={episode} onToggleWatched={this.handleToggleEpisode} hasWatched={false}/>)}
      </ul>
    );
  }
}
