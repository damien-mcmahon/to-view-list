export const SHOW_TV_PANEL = 'SHOW_TV_PANEL';
export const HIDE_TV_PANEL = 'HIDE_TV_PANEL';

export function showTvPanel(tvShow) {
  return {
    type: SHOW_TV_PANEL,
    tvShow
  };
}

export function hideTvPanel() {
  return {
    type: HIDE_TV_PANEL
  };
}
