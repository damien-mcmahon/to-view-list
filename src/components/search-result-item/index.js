import { h, Component } from 'preact';

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
      <li onClick={this.sendItem}>{result.name}</li>
    );
  }
};
