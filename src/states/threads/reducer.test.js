/**
 * Skenario pengujian:
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled upvote when given by UP_VOTE_THREAD action
 *  - should return the threads with the toggled downvote when given by DOWN_VOTE_THREAD action
 *  - should return the threads with neutralized votes when given by NEUTRAL_VOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const actualState = threadsReducer(initialState, action);

    // assert
    expect(actualState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2023-05-29T07:55:52.266Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const actualState = threadsReducer(initialState, action);

    // assert
    expect(actualState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const newThread = {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'React',
      createdAt: '2023-05-29T07:56:52.266Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // action
    const actualState = threadsReducer(initialState, action);

    // assert
    expect(actualState).toEqual([newThread, ...initialState]);
  });

  it('should return the threads with the toggled upvote when given by UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const actualState = threadsReducer(initialState, action);

    // assert
    expect(actualState[0].upVotesBy).toContain('user-1');
    expect(actualState[0].downVotesBy).not.toContain('user-1');
  });

  it('should return the threads with the toggled downvote when given by DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'users-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const actualState = threadsReducer(initialState, action);

    // assert
    expect(actualState[0].downVotesBy).toContain('user-1');
    expect(actualState[0].upVotesBy).not.toContain('user-1');
  });

  it('should return the threads with neutralized votes when given by NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'users-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const actualState = threadsReducer(initialState, action);

    // assert
    expect(actualState[0].upVotesBy).not.toContain('user-1');
    expect(actualState[0].downVotesBy).not.toContain('user-1');
  });
});
