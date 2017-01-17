import { h, Component } from 'preact';
import { connect } from 'preact-redux';

const propsForCalendar = state => ({
  tvShowsWatched: state.tvShowsWatched,
  tvShowList: state.tvShowList
});

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div class="to-view-list--calendar">
        <h1>CALENDAR VIEW</h1>
      </div>
    );
  }
}

export default connect(propsForCalendar)(Calendar);
