import React from 'react';
import { useSelector } from 'react-redux';

function LoadingIndicator() {
  const loading = useSelector((state) => state.loadingBar?.default || 0);

  if (!loading) {
    return null;
  }

  return (
    <div className="loading-bar-container">
      <div className="loading-bar-progress" />
    </div>
  );
}

export default LoadingIndicator;
