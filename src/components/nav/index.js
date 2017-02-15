import { h, Component } from 'preact';
import { pure } from 'recompose';

const HeaderNavigation = props => (
  <nav class="nav--wrapper">
    <input type="checkbox" id="nav--menu-input" />
    <label class="nav--menu-button button" for="nav--menu-input">
    </label>
    <div class="nav--menu-wrapper">
      {props.children}
    </div>
  </nav>
);

export default pure(HeaderNavigation);
