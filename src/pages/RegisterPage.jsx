import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaComments, FaArrowLeft } from 'react-icons/fa';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert('Password minimal harus 6 karakter!');
      return;
    }

    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    if (!result?.error) {
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
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
          <h1 className="auth-title">Gabung ke Dicoding Forum</h1>
          <p className="auth-subtitle">Buat akun untuk mulai berdiskusi dan berbagi pengalaman</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              id="name"
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

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
            Daftar Sekarang
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Sudah punya akun?{' '}
            <Link to="/login" className="text-link">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
