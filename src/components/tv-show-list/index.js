import { h, Component } from 'preact';
import TvShowListItem from '../tv-show-list-item';

export default class TvShowList extends Component {
  constructor(props) {
    super(props);
    this.removeItemHandler = this.removeItemHandler.bind(this);
  }

  removeItemHandler(item) {
    this.props.removeItem(item);
  }

  render() {
    const {shows} = this.props;

    return (
      <div class="tv-show-list--wrapper">
        {shows.map((show) => {
          return <TvShowListItem show={show}  onRemove={this.removeItemHandler} />
        })}
      </div>
    );
  }
} 

