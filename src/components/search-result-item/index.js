import { h, Component } from 'preact';
import TvShowPoster from '../tv-show-poster/';
import TVIcon from '../icon';

export default class SearchResultItem extends Component {
  constructor(props) {
    super(props);
    this.sendItem = this.sendItem.bind(this);
  }

  sendItem(item) {
    this.props.onClick(this.props.result);  
  }

  render() {
    const result = this.props.result || {}
    return (
      <li class="search-result-item--wrapper">
        <TvShowPoster path={result.poster_path} tvShow={result.name} size="small" />
        <h1 class="search-result-item--name">{result.name}</h1>
        <button class="button --action-add search-result-item--add-to-list" onClick={this.sendItem}>
          <TVIcon iconName="plus" />
        </button>
      </li>
    );
  }
};
