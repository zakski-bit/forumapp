/**
 * Skenario pengujian:
 *
 * - LoadingIndicator component
 *  - should not render anything when loading state is 0
 *  - should render loading progress bar when loading state is greater than 0
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import loadingBarReducer from '../states/loadingBar/reducer';
import LoadingIndicator from './LoadingIndicator';

function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: {
      loadingBar: loadingBarReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <LoadingIndicator />
    </Provider>,
  );
}

describe('LoadingIndicator component', () => {
  it('should not render anything when loading state is 0', () => {
    // arrange
    const { container } = renderWithStore({
      loadingBar: { default: 0 },
    });

    // assert
    expect(container.firstChild).toBeNull();
  });

  it('should render loading progress bar when loading state is greater than 0', () => {
    // arrange
    const { container } = renderWithStore({
      loadingBar: { default: 1 },
    });

    // assert
    expect(container.querySelector('.loading-bar-container')).toBeDefined();
    expect(container.querySelector('.loading-bar-progress')).toBeDefined();
  });
});
