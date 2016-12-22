import { h, Component } from 'preact';

export default class EpisodeItem extends Component {
  constructor(props) {
    super(props);

    this.sendWatched = this.sendWatched.bind(this);
  }

  sendWatched(event) {
    this.props.onToggleWatched(this.props.episode.id, event.target.checked);
  }

  render() {
    const { episode, hasWatched, seasonComplete } = this.props;

    return (
      <li class="episode-item--wrapper">
        <label class="episode-item--label">
          <input type="checkbox" onClick={this.sendWatched} checked={hasWatched} disabled={seasonComplete} /> {episode.name}
        </label>
      </li>
    );
  }
}
