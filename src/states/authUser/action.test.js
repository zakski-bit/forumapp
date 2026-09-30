/**
 * Skenario pengujian:
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly and set access token when login success
 *  - should call alert correctly when login failed
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import { showLoading, hideLoading } from '../loadingBar/action';

const fakeToken = 'token-12345';
const fakeUserResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://avatar.com/1.jpg',
};
const fakeErrorResponse = new Error('Email or password is wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly and set access token when login success', async () => {
    // arrange
    api.login = vi.fn().mockResolvedValue(fakeToken);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeUserResponse);

    const dispatch = vi.fn();

    // action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'password123' });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({ error: false });
  });

  it('should call alert correctly when login failed', async () => {
    // arrange
    api.login = vi.fn().mockRejectedValue(fakeErrorResponse);
    window.alert = vi.fn();

    const dispatch = vi.fn();

    // action
    const result = await asyncSetAuthUser({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({ error: true, message: fakeErrorResponse.message });
  });
});
