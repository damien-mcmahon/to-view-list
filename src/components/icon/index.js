import { h, Component } from 'preact';
import Icon from 'react-inlinesvg';
import { pure } from 'recompose';

const BASE_PATH = '/assets/svgs/';
const TVIcon = props => (
  <Icon src={`${BASE_PATH}${props.iconName}.svg`} cacheGetRequests={true} />
);

export default pure(TVIcon);
