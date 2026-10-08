import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch, FaFire, FaTrophy, FaTimes } from 'react-icons/fa';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function WidgetsSidebar({
  searchKeyword = '',
  onSearchChange = () => {},
  selectedCategory = '',
  onSelectCategory = () => {},
  categoriesWithCount = [],
}) {
  const leaderboards = useSelector((state) => state.leaderboards || []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (leaderboards.length === 0) {
      dispatch(asyncReceiveLeaderboards());
    }
  }, [dispatch, leaderboards.length]);

  const topLeaderboards = leaderboards.slice(0, 3);

  const getRankBadge = (index) => {
    return `#${index + 1}`;
  };

  return (
    <aside className="widgets-sidebar-container">
      {/* Search Bar Widget */}
      <div className="search-bar-widget">
        <FaSearch className="search-widget-icon" />
        <input
          type="text"
          placeholder="Cari diskusi atau kata kunci..."
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-widget-input"
        />
        {searchKeyword && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="search-clear-btn"
            title="Hapus pencarian"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Active Filter Pill (if any) */}
      {(selectedCategory || searchKeyword) && (
        <div className="active-filter-card">
          <span className="active-filter-label">Filter aktif:</span>
          {selectedCategory && (
            <span className="filter-pill-tag">
              #{selectedCategory}
              <button
                type="button"
                onClick={() => onSelectCategory('')}
                className="filter-remove-btn"
              >
                ×
              </button>
            </span>
          )}
          {searchKeyword && (
            <span className="filter-pill-tag">
              &quot;{searchKeyword}&quot;
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="filter-remove-btn"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Trends for You Widget */}
      <div className="widget-card trends-widget-card">
        <div className="widget-card-header">
          <h3 className="widget-card-title">
            <FaFire className="widget-title-icon text-amber" />
            Tren untuk Anda
          </h3>
        </div>

        <div className="trends-list">
          {categoriesWithCount.length > 0 ? (
            categoriesWithCount.slice(0, 5).map(({ category, count }) => (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(selectedCategory === category ? '' : category)}
                className={`trend-item-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                <div className="trend-item-meta">
                  <span className="trend-item-sub">Kategori Populer</span>
                  <span className="trend-item-tag">#{category}</span>
                  <span className="trend-item-count">{count} Diskusi</span>
                </div>
              </button>
            ))
          ) : (
            <p className="widget-empty-text">Belum ada tren kategori.</p>
          )}
        </div>
      </div>

      {/* Top Contributors / Who to Follow Widget */}
      <div className="widget-card contributors-widget-card">
        <div className="widget-card-header">
          <h3 className="widget-card-title">
            <FaTrophy className="widget-title-icon text-yellow" />
            Top Kontributor
          </h3>
        </div>

        <div className="contributors-list">
          {topLeaderboards.length > 0 ? (
            topLeaderboards.map((item, index) => (
              <div key={item.user.id} className="contributor-item">
                <span className="contributor-rank">{getRankBadge(index)}</span>
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="contributor-avatar"
                />
                <div className="contributor-info">
                  <span className="contributor-name">{item.user.name}</span>
                  <span className="contributor-handle">
                    @{item.user.name.toLowerCase().replace(/\s+/g, '')}
                  </span>
                </div>
                <div className="contributor-score-badge">
                  <span>{item.score}</span>
                  <small>skor</small>
                </div>
              </div>
            ))
          ) : (
            <p className="widget-empty-text">Memuat papan skor...</p>
          )}
        </div>

        <div className="widget-card-footer">
          <Link to="/leaderboards" className="widget-see-more-link">
            Tampilkan lebih banyak →
          </Link>
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="widgets-footer-meta">
        <p>
          <a href="#about" onClick={(e) => e.preventDefault()}>Tentang</a> ·{' '}
          <a href="#terms" onClick={(e) => e.preventDefault()}>Ketentuan</a> ·{' '}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privasi</a> ·{' '}
          <a href="#help" onClick={(e) => e.preventDefault()}>Bantuan</a>
        </p>
        <p className="copyright-text">© 2026 Dicoding Forum · Twitter Edition</p>
      </footer>
    </aside>
  );
}

export default WidgetsSidebar;
