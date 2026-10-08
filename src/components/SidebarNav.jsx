import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaHome,
  FaHashtag,
  FaTrophy,
  FaBookmark,
  FaFeatherAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaComments,
  FaFlask,
} from 'react-icons/fa';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function SidebarNav({ onOpenTestHub = () => {} }) {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  const handleNewThread = () => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    navigate('/new');
  };

  const username = authUser?.name ? authUser.name.toLowerCase().replace(/\s+/g, '') : 'guest';

  return (
    <aside className="sidebar-nav-container">
      <div className="sidebar-nav-content">
        <div className="sidebar-brand-wrapper">
          <Link to="/" className="sidebar-brand-logo" title="Dicoding Forum">
            <div className="brand-logo-icon">
              <FaComments />
            </div>
            <span className="brand-logo-text">Dicoding Forum</span>
          </Link>
        </div>

        <nav className="sidebar-menu-list">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `sidebar-menu-item ${isActive ? 'active' : ''}`}
          >
            <FaHome className="menu-icon" />
            <span className="menu-label">Beranda</span>
          </NavLink>

          <NavLink
            to="/leaderboards"
            className={({ isActive }) => `sidebar-menu-item ${isActive ? 'active' : ''}`}
          >
            <FaTrophy className="menu-icon" />
            <span className="menu-label">Papan Skor</span>
          </NavLink>

          <Link
            to="/?view=categories"
            className="sidebar-menu-item"
          >
            <FaHashtag className="menu-icon" />
            <span className="menu-label">Eksplorasi</span>
          </Link>

          <Link
            to="/?view=bookmarks"
            className="sidebar-menu-item"
          >
            <FaBookmark className="menu-icon" />
            <span className="menu-label">Tersimpan</span>
          </Link>

          <button
            type="button"
            onClick={onOpenTestHub}
            className="sidebar-menu-item btn-test-menu"
            title="Buka Konsol Diagnostik & Pengujian API"
          >
            <FaFlask className="menu-icon text-cyan" />
            <span className="menu-label">Tes API</span>
            <span className="sidebar-test-badge">Live</span>
          </button>
        </nav>

        <button
          type="button"
          onClick={handleNewThread}
          className="btn-tweet-post"
          title="Buat Diskusi Baru"
        >
          <FaFeatherAlt className="tweet-post-icon" />
          <span className="tweet-post-label">Posting Thread</span>
        </button>

        <div className="sidebar-footer-profile">
          {authUser ? (
            <div className="profile-pill-card">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="profile-pill-avatar"
              />
              <div className="profile-pill-meta">
                <span className="profile-pill-name user-name">{authUser.name}</span>
                <span className="profile-pill-handle">@{username}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="profile-pill-logout-btn"
                title="Keluar dari akun"
                aria-label="Keluar"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="guest-action-pills">
              <Link to="/login" className="guest-pill-btn btn-login">
                <FaSignInAlt /> Masuk
              </Link>
              <Link to="/register" className="guest-pill-btn btn-register">
                <FaUserPlus /> Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

SidebarNav.propTypes = {
  onOpenTestHub: PropTypes.func,
};

SidebarNav.defaultProps = {
  onOpenTestHub: () => {},
};

export default SidebarNav;
