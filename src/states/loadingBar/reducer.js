import { ActionType } from './action';

function loadingBarReducer(loadingBar = { default: 0 }, action = {}) {
  switch (action.type) {
  case ActionType.SHOW_LOADING:
    return { default: loadingBar.default + 1 };
  case ActionType.HIDE_LOADING:
    return { default: Math.max(0, loadingBar.default - 1) };
  default:
    return loadingBar;
  }
}

export default loadingBarReducer;
