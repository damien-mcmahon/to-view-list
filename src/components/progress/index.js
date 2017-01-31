import { h, Component } from 'preact';
import { compose, defaultProps, pure, mapProps } from 'recompose';
const DISPLAY_PERCENTAGE = 0;

const enhanced = compose(
  mapProps(props => ({
    progressWidth: Math.round(Number(props.progress/props.total * 100)).toFixed(DISPLAY_PERCENTAGE)
  })),
  defaultProps({total: 100, progress: 0}),
  pure
);

const ProgressBar = props => (
  <div class="progress-bar--wrapper">
    <span class="progress-bar--label">{props.progressWidth}%</span>
    <div class="progress-bar" style={{width: `${props.progressWidth}%`}}>
    </div>
  </div>
);

export default enhanced(ProgressBar);
