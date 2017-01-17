import { h, Component } from 'preact';

export default class About extends Component {
  render() {
    return (
      <div class="to-view-list--about-wrapper">
        <h1 class="about--title">About</h1>
        <p class="about--text">A simple To-do list app but for TV Shows.</p>
        <h2 class="about--technology">All the Tech</h2>
        <p class="about--text">Built using <a href="https://preactjs.com">Preact</a>, <a href="https://reduxjs.org">Redux</a> running on <a href="https://surge.sh">Surge</a>
        </p>
        <h3 class="about--creator">Built with ❤️ </h3>
        <p class="about--text">Built by <a href="http://macoto.co.uk">Macoto</a> for my wife who watches too much Tv.</p>
      </div>
    );
  }
}
