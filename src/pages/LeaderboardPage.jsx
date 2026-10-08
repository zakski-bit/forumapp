import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import WidgetsSidebar from '../components/WidgetsSidebar';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards || []);
  const threads = useSelector((state) => state.threads || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const categoriesWithCount = React.useMemo(() => {
    const counts = {};
    threads.forEach((t) => {
      if (t.category) {
        counts[t.category] = (counts[t.category] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [threads]);

  const getRankBadge = (index) => {
    if (index === 0) return <span className="rank-badge rank-1"><FaMedal /> 1</span>;
    if (index === 1) return <span className="rank-badge rank-2"><FaMedal /> 2</span>;
    if (index === 2) return <span className="rank-badge rank-3"><FaMedal /> 3</span>;
    return <span className="rank-number">#{index + 1}</span>;
  };

  return (
    <div className="home-layout-grid">
      <section className="home-feed-column">
        {/* Sticky Header */}
        <div className="timeline-header-bar">
          <div className="timeline-header-top">
            <h1 className="timeline-heading">Papan Skor Komunitas</h1>
            <span className="timeline-status-badge">
              <FaTrophy /> {leaderboards.length} Anggota
            </span>
          </div>
          <p className="timeline-header-description">
            Peringkat kontributor diskusi teratas berdasarkan keaktifan berbagi dan interaksi.
          </p>
        </div>

        <div className="leaderboard-table-container">
          <div className="leaderboard-table-header">
            <span className="col-rank">Peringkat</span>
            <span className="col-user">Pengguna</span>
            <span className="col-score">Skor Poin</span>
          </div>

          <div className="leaderboard-list">
            {leaderboards.length > 0 ? (
              leaderboards.map((item, index) => {
                const username = item.user.name ? item.user.name.toLowerCase().replace(/\s+/g, '') : 'user';
                return (
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
                        <span className="leaderboard-handle">@{username}</span>
                      </div>
                    </div>

                    <div className="col-score">
                      <span className="score-value">{item.score}</span>
                      <span className="score-label">pts</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state-card">
                <p>Memuat data klasemen...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <WidgetsSidebar categoriesWithCount={categoriesWithCount} />
    </div>
  );
}

export default LeaderboardPage;
