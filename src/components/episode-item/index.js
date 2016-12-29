import { h, Component } from 'preact';
import moment from 'moment';

const AIR_DATE_FORMAT = 'MMM Do YYYY';

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
    const airDate = new moment(episode.air_date).format(AIR_DATE_FORMAT);
    return (
      <li class="episode-item--wrapper">
        <label class="episode-item--label">
          <input 
            type="checkbox" 
            onClick={this.sendWatched} 
            checked={hasWatched} 
            disabled={seasonComplete} /> 
          <span class="episode-item--number">{episode.episode_number} </span>-  
          <span class="episode-item--name"> {episode.name}</span>
        </label>
        <span class="episode-item--air-date">{airDate}</span>
      </li>
    );
  }
}
