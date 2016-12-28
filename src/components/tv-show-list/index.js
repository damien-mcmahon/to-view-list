import { h, Component } from 'preact';
import TvShowListItem from '../tv-show-list-item';

export default class TvShowList extends Component {
  constructor(props) {
    super(props);
    this.removeItemHandler = this.removeItemHandler.bind(this);
    this.showItemHandler = this.showItemHandler.bind(this);
  }

  removeItemHandler(item) {
    this.props.removeItem(item);
  }

  showItemHandler(item) {
    this.props.showInfoPanel(item);
  }

  render(props, state) {
    const { shows, watchedShows } = props;

    return (
      <div class="tv-show-list--wrapper">
        {shows.map((show) => {
          const watchedInfo = watchedShows[show.id];
          return <TvShowListItem 
                    show={show} 
                    watchedInfo={watchedInfo}
                    onRemove={this.removeItemHandler} 
                    onInfoClick={this.showItemHandler}/>
        })}
      </div>
    );
  }
} 

