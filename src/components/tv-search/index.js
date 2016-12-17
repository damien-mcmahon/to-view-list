import { h, Component } from 'preact';

const DEBOUNCE_TIME = 400;

export default class TvSearch extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.timeout = null;
  }

  search(e) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      const searchTerm = e.target.value;

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

  render() {
    return (
      <div class="tv-search--wrapper">
        <input type="search" class="tv-search--input" placeholder="Breaking Bad" onInput={this.search} />
      </div>
    );
  }
}
