import {
  SHOW_TV_PANEL,
  HIDE_TV_PANEL
 } from '../actions/tv-panel';

const initialTVShowPanelState = {
  visible: false,
  tvShow: null
};

export default function tvShowPanel(state = initialTVShowPanelState, action) {
  switch(action.type) {
    case SHOW_TV_PANEL:
      return { visible: true, tvShow: action.tvShow };
    case HIDE_TV_PANEL: 
      return initialTVShowPanelState;
    default: 
      return state
  }

}
