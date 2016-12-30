import { h, Component } from 'preact';
import moment from 'moment';
import 'moment-duration-format';

const MINUTES = 'minutes';
const ONE_DAY = '24';

export default class SummaryFooter extends Component {
  
  calculateAllViewingTime(shows, watched) {
    return shows.reduce((viewingTime, show) => {
      const showAverageDuration = show.episode_run_time.reduce((totalTime, runTime) => totalTime +runTime) / show.episode_run_time.length;

      return viewingTime + show.number_of_episodes * showAverageDuration;
    }, 0);
  } 

  calculateViewedTime(shows, watched) {
    return shows.reduce((viewedTime, show) => {
      const showAverageDuration = show.episode_run_time.reduce((totalTime, runTime) => totalTime +runTime) / show.episode_run_time.length;
      const showHasBeenWatched = watched[show.id] || undefined;
      let episodesWatchedCount = 0;

      if (showHasBeenWatched) {
        const { episodesViewed } = showHasBeenWatched;

        for( let seasonNumber in episodesViewed) {
          if (episodesViewed.hasOwnProperty(seasonNumber)) {
            let season = episodesViewed[seasonNumber];
            const showSeasonInfo = show.seasons.find((showSeason) => showSeason.season_number === parseInt(seasonNumber, 10));
            episodesWatchedCount += season.completed ? showSeasonInfo.episode_count : season.watched.length;
          }
        }
      }
      return viewedTime += episodesWatchedCount * showAverageDuration;
    }, 0);
  }
  
  displayFormattedDuration(duration) {
    const totalViewingDuration = new moment.duration(duration, MINUTES);

    if(totalViewingDuration.as('hours') > ONE_DAY) {
      return totalViewingDuration.format('D[D] H[H]');
    } else {
      return totalViewingDuration.format('H[H]');
    }
  }

  render(props) {
    const { shows, watched } = props;
    const totalShowsInList = shows.length;
    const totalViewedTime = this.calculateViewedTime(shows, watched); 
    const totalShowsDuration = this.calculateAllViewingTime(shows, watched);
    const remaingViewingTime = totalShowsDuration - totalViewedTime;

    //TODO Make the time labels a component
    return (
      <footer class="to-view-list--summary-footer">
        <span class="summary-footer--total-shows">
          <span class="to-view-list--label">Shows:</span>
          {totalShowsInList}
        </span>
        <span class="summary-footer--total-viewing-duration">
          <span class="to-view-list--label">Remaining Viewing Time:</span>
          {this.displayFormattedDuration(remaingViewingTime)}
        </span>
        <span class="summary-footer--total-viewed-duration">
          <span class="to-view-list--label">Total Viewed Time:</span>
          {this.displayFormattedDuration(totalViewedTime)}
        </span>
      </footer>
    );
  }
}
