/**
 * Skenario pengujian:
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threadDetail when given by RECEIVE_THREAD_DETAIL action
 *  - should return null when given by CLEAR_THREAD_DETAIL action
 *  - should return the threadDetail with new comment when given by ADD_COMMENT action
 *  - should return the threadDetail with toggled comment upvote when given by UP_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const actualState = threadDetailReducer(initialState, action);

    // assert
    expect(actualState).toEqual(initialState);
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: { id: 'user-1', name: 'John Doe', avatar: 'https://avatar.com/1.jpg' },
      category: 'redux',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail,
      },
    };

    // action
    const actualState = threadDetailReducer(initialState, action);

    // assert
    expect(actualState).toEqual(threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
    };

    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const actualState = threadDetailReducer(initialState, action);

    // assert
    expect(actualState).toBeNull();
  });

  it('should return the threadDetail with new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      comments: [],
    };

    const newComment = {
      id: 'comment-1',
      content: 'Komentar pertama',
      createdAt: '2023-05-29T08:00:00.000Z',
      owner: { id: 'user-2', name: 'Jane Doe' },
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // action
    const actualState = threadDetailReducer(initialState, action);

    // assert
    expect(actualState.comments).toEqual([newComment]);
  });

  it('should return the threadDetail with toggled comment upvote when given by UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      comments: [
        {
          id: 'comment-1',
          content: 'Komentar pertama',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ],
    };

    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const actualState = threadDetailReducer(initialState, action);

    // assert
    expect(actualState.comments[0].upVotesBy).toContain('user-1');
    expect(actualState.comments[0].downVotesBy).not.toContain('user-1');
  });
});
