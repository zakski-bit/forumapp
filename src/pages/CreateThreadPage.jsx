import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlusCircle, FaArrowLeft } from 'react-icons/fa';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!authUser) {
    return (
      <section className="restricted-page-container">
        <div className="restricted-card">
          <h2>Akses Terbatas</h2>
          <p>Anda harus login terlebih dahulu untuk dapat membuat diskusi baru.</p>
          <Link to="/login" className="btn-primary">
            Masuk ke Akun
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const result = await dispatch(
      asyncAddThread({
        title,
        body,
        category: category.trim(),
      }),
    );

    if (!result?.error) {
      navigate('/');
    }
  };

  return (
    <section className="create-thread-page-container">
      <div className="back-navigation">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Kembali ke Beranda
        </Link>
      </div>

      <div className="create-thread-card">
        <div className="create-thread-header">
          <FaPlusCircle className="create-thread-icon" />
          <h1 className="create-thread-title">Buat Diskusi Baru</h1>
          <p className="create-thread-subtitle">
            Bagikan pertanyaan, opini, atau topik menarik kepada komunitas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="create-thread-form">
          <div className="form-group">
            <label htmlFor="title">Judul Diskusi</label>
            <input
              id="title"
              type="text"
              placeholder="Contoh: Mengapa React 19 Mengubah Paradigma Hooks?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategori (Opsional)</label>
            <input
              id="category"
              type="text"
              placeholder="Contoh: react, javascript, redux"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Isi Diskusi</label>
            <textarea
              id="body"
              rows="8"
              placeholder="Jelaskan detail topik diskusi Anda secara lengkap..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          <div className="create-thread-actions">
            <button type="submit" className="btn-primary submit-thread-btn">
              Publikasikan Diskusi
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateThreadPage;
