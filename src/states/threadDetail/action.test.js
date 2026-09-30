/**
 * Skenario pengujian:
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when fetching thread detail success
 *  - should call alert correctly when fetching thread detail failed
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import api from '../../utils/api';
import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  receiveThreadDetailActionCreator,
} from './action';
import { showLoading, hideLoading } from '../loadingBar/action';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Judul Thread',
  body: 'Isi detail thread',
  category: 'general',
  createdAt: '2023-05-29T07:55:52.266Z',
  owner: { id: 'user-1', name: 'John Doe', avatar: 'https://avatar.com/1.jpg' },
  comments: [],
  upVotesBy: [],
  downVotesBy: [],
};

const fakeErrorResponse = new Error('Thread not found');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    delete api._getThreadDetail;
  });

  it('should dispatch action correctly when fetching thread detail success', async () => {
    // arrange
    api.getThreadDetail = vi.fn().mockResolvedValue(fakeThreadDetail);
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetail));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call alert correctly when fetching thread detail failed', async () => {
    // arrange
    api.getThreadDetail = vi.fn().mockRejectedValue(fakeErrorResponse);
    window.alert = vi.fn();
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
