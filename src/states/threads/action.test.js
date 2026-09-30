/**
 * Skenario pengujian:
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when thread creation success
 *  - should call alert correctly when thread creation failed
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import api from '../../utils/api';
import { asyncAddThread, addThreadActionCreator } from './action';
import { showLoading, hideLoading } from '../loadingBar/action';

const fakeThreadPayload = {
  title: 'Judul Baru',
  body: 'Isi thread baru',
  category: 'react',
};

const fakeCreatedThread = {
  id: 'thread-99',
  ...fakeThreadPayload,
  createdAt: '2023-05-29T07:55:52.266Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Failed to create thread');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when thread creation success', async () => {
    // arrange
    api.createThread = vi.fn().mockResolvedValue(fakeCreatedThread);
    const dispatch = vi.fn();

    // action
    const result = await asyncAddThread(fakeThreadPayload)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createThread).toHaveBeenCalledWith(fakeThreadPayload);
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeCreatedThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({ error: false });
  });

  it('should call alert correctly when thread creation failed', async () => {
    // arrange
    api.createThread = vi.fn().mockRejectedValue(fakeErrorResponse);
    window.alert = vi.fn();
    const dispatch = vi.fn();

    // action
    const result = await asyncAddThread(fakeThreadPayload)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({ error: true, message: fakeErrorResponse.message });
  });
});
