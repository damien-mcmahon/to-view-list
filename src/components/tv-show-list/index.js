import { h, Component } from 'preact';
import TvShowListItem from '../tv-show-list-item';

export default class TvShowList extends Component {
  render() {
    const {shows} = this.props;

    return (
      <div class="tv-show-list--wrapper">
        {shows.map((show) => {
          return <TvShowListItem show={show} />
        })}
      </div>
    );
  }
} 

