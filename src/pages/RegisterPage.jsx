import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
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
        <div className="auth-header">
          <FaUserPlus className="auth-icon" />
          <h1 className="auth-title">Daftar Akun Baru</h1>
          <p className="auth-subtitle">Bergabung bersama komunitas diskusi sekarang</p>
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

        <p className="auth-footer-text">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-link">
            Masuk di sini
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
