import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaSignInAlt } from 'react-icons/fa';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    if (!result?.error) {
      navigate('/');
    }
  };

  return (
    <section className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <FaSignInAlt className="auth-icon" />
          <h1 className="auth-title">Masuk ke Akun</h1>
          <p className="auth-subtitle">Masuk untuk mulai berdiskusi dan berbagi ide</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-primary auth-submit-btn">
            Masuk Sekarang
          </button>
        </form>

        <p className="auth-footer-text">
          Belum punya akun?{' '}
          <Link to="/register" className="text-link">
            Daftar di sini
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
