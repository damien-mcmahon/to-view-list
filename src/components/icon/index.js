import { h, Component } from 'preact';
import Icon from 'react-inlinesvg';

const BASE_PATH = '/assets/svgs/';

export default class TVIcon extends Component {
  render() {
    const { iconName } = this.props;
    return (<Icon src={`${BASE_PATH}${iconName}.svg`} cacheGetRequests={true} />);
  }
}; 

