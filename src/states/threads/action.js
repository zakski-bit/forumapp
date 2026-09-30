import api from '../../utils/api';
import { showLoading, hideLoading } from '../loadingBar/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return { error: false };
    } catch (error) {
      alert(error.message);
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();

    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote!');
      return;
    }

    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const isUpVoted = thread.upVotesBy.includes(authUser.id);
    const isDownVoted = thread.downVotesBy.includes(authUser.id);

    // Optimistic Update
    if (voteType === 1) {
      if (isUpVoted) {
        dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
        try {
          await api.neutralVoteThread(threadId);
        } catch (error) {
          alert(error.message);
          dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
        }
      } else {
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
        try {
          await api.upVoteThread(threadId);
        } catch (error) {
          alert(error.message);
          dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
        }
      }
    } else if (voteType === -1) {
      if (isDownVoted) {
        dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
        try {
          await api.neutralVoteThread(threadId);
        } catch (error) {
          alert(error.message);
          dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
        }
      } else {
        dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
        try {
          await api.downVoteThread(threadId);
        } catch (error) {
          alert(error.message);
          dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
        }
      }
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread,
};
