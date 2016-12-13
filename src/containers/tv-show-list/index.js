import { h, Component } from 'preact';
import { connect } from 'preact-redux';

const appStateToProps = (state) => ({tvShowList: state.tvShows});

class TvShowList extends Component {
  render() {
    console.log("DM => TVSHOWLIST PROPS: ", this.props);
    return (<div class="tv-show-list--wrapper">TVSL</div>);
  }
} 

export default connect(appStateToProps)(TvShowList);
