import { h, Component } from 'preact';
import SearchResultItem from '../search-result-item';

export default class SearchResultList extends Component {
  constructor(props) {
    super(props);
    this.sendItem = this.sendItem.bind(this);
  }

  sendItem(item) {
    this.props.onSelect(item);
  }

  render() {
    const resultSet = this.props.resultsSet || []
    return (
      <ul class="search-result-list--wrapper">
        {resultSet.map((result) => {
          return <SearchResultItem result={result} onClick={this.sendItem} />
          })
        } 
      </ul>
    );
  }
};
