import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaFeatherAlt, FaHashtag, FaSignInAlt } from 'react-icons/fa';
import { asyncAddThread } from '../states/threads/action';

function QuickCompose({ onThreadCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

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
      setTitle('');
      setCategory('');
      setBody('');
      setIsExpanded(false);
      if (onThreadCreated) onThreadCreated();
    }
  };

  if (!authUser) {
    return (
      <div className="quick-compose-guest-banner">
        <div className="guest-banner-icon">
          <FaFeatherAlt />
        </div>
        <div className="guest-banner-text">
          <h4>Punya ide atau pertanyaan untuk didiskusikan?</h4>
          <p>Masuk sekarang untuk berbagi pemikiran dan bergabung dalam diskusi komunitas.</p>
        </div>
        <Link to="/login" className="guest-banner-btn">
          <FaSignInAlt /> Masuk
        </Link>
      </div>
    );
  }

  return (
    <div className="quick-compose-container">
      <div className="quick-compose-avatar-col">
        <img
          src={authUser.avatar}
          alt={authUser.name}
          className="quick-compose-avatar"
        />
      </div>

      <form onSubmit={handleSubmit} className="quick-compose-form">
        <input
          type="text"
          placeholder="Judul Diskusi..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          className="quick-compose-title-input"
          required
        />

        {isExpanded && (
          <div className="quick-compose-category-wrap">
            <FaHashtag className="category-hash-icon" />
            <input
              type="text"
              placeholder="Tagar kategori (misal: react, redux, karir)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="quick-compose-category-input"
            />
          </div>
        )}

        <textarea
          rows={isExpanded ? 3 : 2}
          placeholder="Apa yang sedang Anda pikirkan? Tuliskan isi diskusi..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          className="quick-compose-textarea"
          required
        />

        <div className="quick-compose-footer">
          <div className="quick-compose-meta">
            {category && (
              <span className="quick-compose-tag-preview">
                #{category.replace(/^#/, '')}
              </span>
            )}
          </div>

          <div className="quick-compose-actions">
            {isExpanded && (
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="btn-cancel-compose"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !body.trim()}
              className="btn-tweet-submit"
            >
              {isSubmitting ? 'Mengirim...' : 'Posting'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuickCompose;
