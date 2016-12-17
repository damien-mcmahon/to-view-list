import { h, Component } from 'preact';


export default class Season extends Component {
  render() {
    const {
      season,
     seasonNumber
    } = this.props; 
    return (
      <div class="season--wrapper">
        <p>Season {seasonNumber}</p>
      </div>
    );
  }
}

