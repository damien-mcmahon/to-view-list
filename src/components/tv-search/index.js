import { h, Component } from 'preact';

const DEBOUNCE_TIME = 400;
const MINIMUM_SEARCH_LENGTH = 3;

export default class TvSearch extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.timeout = null;

    this.state = {
      searchTerm:  ''
    }
  }

  search(e) {
    let searchTerm = e.target.value;

    if (searchTerm.length < MINIMUM_SEARCH_LENGTH) {
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.props.searchFor(searchTerm);
      this.setState({
        searchTerm: searchTerm
      });
    }, DEBOUNCE_TIME);
  }

  componentWillReceiveProps(newProps) {
    if(newProps && newProps.clearSearch) {
      this.setState({
        searchTerm: ''
      });
    }
  }

  render(props, state) {
    const searchTerm = state.clearSearch ? '' : state.searchTerm;

    return (
      <div class="tv-search--wrapper">
        <label for="tv-search--input" class="tv-search--input-label">Search</label>
        <input type="search" 
          class="tv-search--input" 
          name="tv-search--input"  
          placeholder="Breaking Bad" 
          onInput={this.search} value={searchTerm} />
      </div>
    );
  }
}
