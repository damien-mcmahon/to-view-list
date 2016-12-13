import { h, Component } from 'preact';

export default class TvSearch extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(e) {
    //TODO: debounce
    this.props.searchFor(e.target.value);
  }

  render() {
    return (
      <div class="tv-search--wrapper">
        <input type="search" placeholder="Breaking Bad" onInput={this.search}/>
      </div>
    );
  }
}
