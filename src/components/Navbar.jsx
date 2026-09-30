import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaComments, FaTrophy, FaPlus, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Navbar() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FaComments className="brand-icon" />
          <span className="brand-text">ForumKu</span>
        </Link>

        <nav className="navbar-nav">
          <Link to="/" className="nav-link">
            Threads
          </Link>
          <Link to="/leaderboards" className="nav-link">
            <FaTrophy className="nav-icon" />
            Leaderboard
          </Link>

          {authUser && (
            <Link to="/new" className="nav-link nav-btn-primary">
              <FaPlus className="nav-icon" />
              Buat Thread
            </Link>
          )}
        </nav>

        <div className="navbar-auth">
          {authUser ? (
            <div className="user-profile">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="user-avatar"
              />
              <span className="user-name">{authUser.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="logout-btn"
                title="Keluar"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="guest-links">
              <Link to="/login" className="btn-secondary">
                <FaSignInAlt /> Masuk
              </Link>
              <Link to="/register" className="btn-primary">
                <FaUserPlus /> Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
