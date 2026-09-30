/**
 * Skenario pengujian:
 *
 * - isPreloadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return false when given by SET_IS_PRELOAD action with false payload
 *  - should return true when given by SET_IS_PRELOAD action with true payload
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // action
    const actualState = isPreloadReducer(initialState, action);

    // assert
    expect(actualState).toEqual(initialState);
  });

  it('should return false when given by SET_IS_PRELOAD action with false payload', () => {
    // arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    // action
    const actualState = isPreloadReducer(initialState, action);

    // assert
    expect(actualState).toBe(false);
  });

  it('should return true when given by SET_IS_PRELOAD action with true payload', () => {
    // arrange
    const initialState = false;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: true,
      },
    };

    // action
    const actualState = isPreloadReducer(initialState, action);

    // assert
    expect(actualState).toBe(true);
  });
});
