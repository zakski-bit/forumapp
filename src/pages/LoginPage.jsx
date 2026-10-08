import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaComments, FaArrowLeft } from 'react-icons/fa';
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
        <div className="auth-top-nav">
          <Link to="/" className="auth-back-link">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
        </div>

        <div className="auth-header">
          <div className="auth-logo-icon">
            <FaComments />
          </div>
          <h1 className="auth-title">Masuk ke Dicoding Forum</h1>
          <p className="auth-subtitle">Bergabung kembali ke percakapan komunitas pengembang</p>
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

        <div className="auth-footer">
          <p>
            Belum punya akun?{' '}
            <Link to="/register" className="text-link">
              Daftar akun baru di sini
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
