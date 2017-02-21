import { h, Component } from 'preact';
import { pure, compose, withHandlers} from 'recompose';

const enhanced = compose(
  withHandlers({
   onClick: props => event => {
     const navCheckBox = document.getElementById('nav--menu-input');
     
     if (navCheckBox) {
       navCheckBox.checked = !navCheckBox.checked;
     }
   }
  }),
  pure
);
const HeaderNavigation = (props) => (
  <nav class="nav--wrapper">
    <input type="checkbox" id="nav--menu-input" />
    <label class="nav--menu-button button" for="nav--menu-input">
      <span class="nav--menu-button-label">NAV</span>
    </label>
    <div class="nav--menu-wrapper" onClick={props.onClick}>
      {props.children}
    </div>
  </nav>
);

export default enhanced(HeaderNavigation);
