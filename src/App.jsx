import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import LoadingIndicator from './components/LoadingIndicator';
import SidebarNav from './components/SidebarNav';
import ApiTestModal from './components/ApiTestModal';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="loading-state-screen">
        <LoadingIndicator />
        <div className="preload-spinner-wrap">
          <div className="preload-spinner" />
          <p>Menyiapkan Dicoding Forum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <LoadingIndicator />
      <div className="app-layout-wrapper">
        <SidebarNav onOpenTestHub={() => setIsTestModalOpen(true)} />
        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/new" element={<CreateThreadPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>

      <ApiTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </div>
  );
}

export default App;
