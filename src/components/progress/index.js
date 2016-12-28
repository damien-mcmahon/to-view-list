import { h, Component } from 'preact';

export default class ProgressBar extends Component {
  render(props) {
    const { total, progress } = props;
    const progressWidth = Number(progress/total * 100).toFixed(2);

    return (
      <div class="progress-bar--wrapper">
        <span class="progress-bar--label">{progressWidth}%</span>
        <div class="progress-bar" style={{width: `${progressWidth}%`}}>
        </div>
      </div>
    );
  }
}
