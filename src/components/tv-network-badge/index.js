import { h, Component } from 'preact';
import { pure, compose, mapProps, defaultProps } from 'recompose';

const enhanced = compose(
  mapProps(props => ({
    networkClassName: props.network.toLowerCase().replace(' ','-'),
    network: props.network
  })),
  pure
);
const TvNetworkBadge = props => (
  <p class={`tv-show-panel--network-badge network-badge --network-${props.networkClassName}`}>{props.network}</p>
);

export default enhanced(TvNetworkBadge);
