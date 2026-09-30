const ActionType = {
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
};

function showLoading() {
  return {
    type: ActionType.SHOW_LOADING,
  };
}

function hideLoading() {
  return {
    type: ActionType.HIDE_LOADING,
  };
}

export {
  ActionType,
  showLoading,
  hideLoading,
};
