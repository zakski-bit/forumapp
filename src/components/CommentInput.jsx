import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CommentInput({ authUser, onAddComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddComment(content);
    setContent('');
  };

  if (!authUser) {
    return (
      <div className="comment-login-notice">
        <p>
          Silakan <Link to="/login" className="text-link">Login</Link> terlebih dahulu untuk memberi komentar.
        </p>
      </div>
    );
  }

  return (
    <div className="comment-input-card">
      <h3 className="comment-input-title">Beri Komentar</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          rows="4"
          placeholder="Tulis tanggapan atau komentar Anda di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea"
          required
        />
        <div className="comment-form-actions">
          <button type="submit" className="btn-primary">
            Kirim Komentar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentInput;
