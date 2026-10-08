import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft, FaHashtag, FaFeatherAlt } from 'react-icons/fa';
import { asyncAddThread } from '../states/threads/action';
import WidgetsSidebar from '../components/WidgetsSidebar';

function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoriesWithCount = React.useMemo(() => {
    const counts = {};
    threads.forEach((t) => {
      if (t.category) {
        counts[t.category] = (counts[t.category] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([cat, count]) => ({ category: cat, count }))
      .sort((a, b) => b.count - a.count);
  }, [threads]);

  if (!authUser) {
    return (
      <div className="home-layout-grid">
        <section className="home-feed-column">
          <div className="restricted-card">
            <h2>Akses Terbatas</h2>
            <p>Anda harus login terlebih dahulu untuk dapat membuat diskusi baru.</p>
            <Link to="/login" className="btn-tweet-post">
              Masuk ke Akun
            </Link>
          </div>
        </section>
        <WidgetsSidebar categoriesWithCount={categoriesWithCount} />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    const result = await dispatch(
      asyncAddThread({
        title,
        body,
        category: category.trim().replace(/^#/, ''),
      }),
    );
    setIsSubmitting(false);

    if (!result?.error) {
      navigate('/');
    }
  };

  return (
    <div className="home-layout-grid">
      <section className="home-feed-column">
        <div className="detail-header-bar">
          <Link to="/" className="detail-back-btn" title="Kembali ke Beranda">
            <FaArrowLeft />
          </Link>
          <div className="detail-header-meta">
            <h1 className="detail-header-title">Posting Diskusi Baru</h1>
            <span className="detail-header-sub">Bagikan opini atau pertanyaan ke komunitas</span>
          </div>
        </div>

        <div className="compose-page-card">
          <div className="compose-user-meta">
            <img
              src={authUser.avatar}
              alt={authUser.name}
              className="compose-user-avatar"
            />
            <div className="compose-user-info">
              <span className="compose-user-name">{authUser.name}</span>
              <span className="compose-user-handle">
                @{authUser.name.toLowerCase().replace(/\s+/g, '')}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="compose-page-form">
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
              <label htmlFor="category">Kategori / Tagar</label>
              <div className="input-with-icon">
                <FaHashtag className="input-leading-icon" />
                <input
                  id="category"
                  type="text"
                  placeholder="react, redux, testing (tanpa tanda #)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-input input-pl-icon"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="body">Isi Diskusi</label>
              <textarea
                id="body"
                rows="8"
                placeholder="Tuliskan latar belakang pertanyaan, argumen, atau kode yang ingin Anda diskusikan..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="form-textarea"
                required
              />
            </div>

            <div className="compose-form-actions">
              <Link to="/" className="btn-cancel-compose">
                Batal
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !body.trim()}
                className="btn-tweet-submit btn-tweet-lg"
              >
                <FaFeatherAlt /> {isSubmitting ? 'Menerbitkan...' : 'Posting Thread'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <WidgetsSidebar categoriesWithCount={categoriesWithCount} />
    </div>
  );
}

export default CreateThreadPage;
