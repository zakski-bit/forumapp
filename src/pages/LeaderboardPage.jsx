import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const getRankBadge = (index) => {
    if (index === 0) return <span className="rank-badge rank-1"><FaMedal /> 1</span>;
    if (index === 1) return <span className="rank-badge rank-2"><FaMedal /> 2</span>;
    if (index === 2) return <span className="rank-badge rank-3"><FaMedal /> 3</span>;
    return <span className="rank-number">{index + 1}</span>;
  };

  return (
    <section className="leaderboard-page-container">
      <div className="leaderboard-card">
        <div className="leaderboard-header">
          <FaTrophy className="leaderboard-icon" />
          <h1 className="leaderboard-title">Klasemen Pengguna Aktif</h1>
          <p className="leaderboard-subtitle">
            Peringkat kontributor diskusi teratas berdasarkan keaktifan
          </p>
        </div>

        <div className="leaderboard-table-header">
          <span className="col-rank">Peringkat</span>
          <span className="col-user">Pengguna</span>
          <span className="col-score">Skor Poin</span>
        </div>

        <div className="leaderboard-list">
          {leaderboards.length > 0 ? (
            leaderboards.map((item, index) => (
              <div key={item.user.id} className={`leaderboard-row ${index < 3 ? 'top-three' : ''}`}>
                <div className="col-rank">
                  {getRankBadge(index)}
                </div>

                <div className="col-user">
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="leaderboard-avatar"
                  />
                  <div className="leaderboard-user-details">
                    <span className="leaderboard-username">{item.user.name}</span>
                    <span className="leaderboard-email">{item.user.email}</span>
                  </div>
                </div>

                <div className="col-score">
                  <span className="score-value">{item.score}</span>
                  <span className="score-label">pts</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Memuat data klasemen...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LeaderboardPage;
