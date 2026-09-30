import api from '../../utils/api';
import { showLoading, hideLoading } from '../loadingBar/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      return { error: false };
    } catch (error) {
      alert(error.message);
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThreadDetail(voteType) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote!');
      return;
    }

    if (!threadDetail) return;

    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    // Optimistic Update
    if (voteType === 1) {
      if (isUpVoted) {
        dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
        try {
          await api.neutralVoteThread(threadDetail.id);
        } catch (error) {
          alert(error.message);
          dispatch(upVoteThreadDetailActionCreator(authUser.id));
        }
      } else {
        dispatch(upVoteThreadDetailActionCreator(authUser.id));
        try {
          await api.upVoteThread(threadDetail.id);
        } catch (error) {
          alert(error.message);
          dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
        }
      }
    } else if (voteType === -1) {
      if (isDownVoted) {
        dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
        try {
          await api.neutralVoteThread(threadDetail.id);
        } catch (error) {
          alert(error.message);
          dispatch(downVoteThreadDetailActionCreator(authUser.id));
        }
      } else {
        dispatch(downVoteThreadDetailActionCreator(authUser.id));
        try {
          await api.downVoteThread(threadDetail.id);
        } catch (error) {
          alert(error.message);
          dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
        }
      }
    }
  };
}

function asyncToggleVoteComment({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote komentar!');
      return;
    }

    if (!threadDetail) return;

    const comment = threadDetail.comments.find((c) => c.id === commentId);
    if (!comment) return;

    const isUpVoted = comment.upVotesBy.includes(authUser.id);
    const isDownVoted = comment.downVotesBy.includes(authUser.id);

    // Optimistic Update
    if (voteType === 1) {
      if (isUpVoted) {
        dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
        try {
          await api.neutralVoteComment({ threadId, commentId });
        } catch (error) {
          alert(error.message);
          dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
        }
      } else {
        dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
        try {
          await api.upVoteComment({ threadId, commentId });
        } catch (error) {
          alert(error.message);
          dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
        }
      }
    } else if (voteType === -1) {
      if (isDownVoted) {
        dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
        try {
          await api.neutralVoteComment({ threadId, commentId });
        } catch (error) {
          alert(error.message);
          dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
        }
      } else {
        dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
        try {
          await api.downVoteComment({ threadId, commentId });
        } catch (error) {
          alert(error.message);
          dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
        }
      }
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
};
